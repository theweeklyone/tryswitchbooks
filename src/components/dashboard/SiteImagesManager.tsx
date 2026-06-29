"use client";

import { useCallback, useMemo, useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { ContentMap } from "@/lib/content";
import type { EditableImage, EditableImageGroup } from "@/data/editable-images";

// Dashboard → Images. Left-hand menu of pages; each image shows its current
// picture (uploaded override, else the bundled default) with an "Upload new"
// button and a "Reset" that reverts to the original. Uploads go straight to
// the `site-images` Storage bucket; the public URL is saved in content_block
// (same store as the wording) so the site picks it up within a minute.
//
// Uploads pass through a framing step: the team drags to reposition and zooms
// to resize the photo into the exact shape the slot needs, and we bake that
// crop into the saved JPEG. That way a large or wrongly-shaped photo always
// sits correctly, with no awkward CSS cropping on the live site.

const BUCKET = "site-images";
const MAX_BYTES = 15 * 1024 * 1024; // 15 MB (re-encoded down on save)

function safeKey(key: string) {
  return key.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
}

// "aspect-[4/5]" -> 0.8, "aspect-[16/9]" -> 1.778. Falls back to 4/5.
function parseAspect(aspectClass: string) {
  const m = aspectClass.match(/\[\s*([\d.]+)\s*\/\s*([\d.]+)\s*\]/);
  if (m) {
    const w = Number(m[1]);
    const h = Number(m[2]);
    if (w > 0 && h > 0) return w / h;
  }
  return 4 / 5;
}

// Export dimensions for a given aspect, kept crisp on retina without being huge.
function outSize(aspect: number) {
  if (aspect >= 1) {
    const W = 1600;
    return { W, H: Math.round(W / aspect) };
  }
  const H = 1500;
  return { W: Math.round(H * aspect), H };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = src;
  });
}

// Bake the chosen crop area into a fresh JPEG at the slot's target size.
async function cropToBlob(src: string, area: Area, W: number, H: number): Promise<Blob> {
  const img = await loadImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, W, H);
  return await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Export failed"))),
      "image/jpeg",
      0.92,
    ),
  );
}

type Framing = {
  key: string;
  label: string;
  src: string; // object URL of the picked file
  aspect: number;
  outW: number;
  outH: number;
};

export function SiteImagesManager({
  groups,
  values,
}: {
  groups: EditableImageGroup[];
  values: ContentMap;
}) {
  const [active, setActive] = useState(groups[0]?.id ?? "");
  // key → current displayed src (override if present, else default).
  const initial = useMemo(() => {
    const m: Record<string, string> = {};
    for (const g of groups) {
      for (const img of g.images) {
        const saved = values[img.key];
        m[img.key] = saved != null && saved !== "" ? saved : img.defaultSrc;
      }
    }
    return m;
  }, [groups, values]);

  const [srcByKey, setSrcByKey] = useState<Record<string, string>>(initial);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [statusKey, setStatusKey] = useState<{ key: string; msg: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [framing, setFraming] = useState<Framing | null>(null);

  const group = groups.find((g) => g.id === active) ?? groups[0];

  function closeFraming() {
    setFraming((f) => {
      if (f) URL.revokeObjectURL(f.src);
      return null;
    });
  }

  // Step 1: pick a file → validate → open the framing modal.
  function onPick(img: EditableImage, file: File) {
    setError(null);
    setStatusKey(null);
    if (!file.type.startsWith("image/")) {
      setError("That file is not an image. Please choose a JPG or PNG.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("That image is over 15 MB. Please choose a smaller file.");
      return;
    }
    const aspect = parseAspect(img.aspect);
    const { W, H } = outSize(aspect);
    setFraming({
      key: img.key,
      label: img.label,
      src: URL.createObjectURL(file),
      aspect,
      outW: W,
      outH: H,
    });
  }

  // Step 2: bake the chosen crop and upload it.
  async function onSaveFrame(area: Area) {
    if (!framing) return;
    const { key, src, outW, outH } = framing;
    setBusyKey(key);
    setError(null);
    try {
      const blob = await cropToBlob(src, area, outW, outH);
      const supabase = createSupabaseBrowserClient();
      const path = `${safeKey(key)}.jpg`;

      const up = await supabase.storage
        .from(BUCKET)
        .upload(path, blob, { upsert: true, contentType: "image/jpeg" });
      if (up.error) throw up.error;

      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
      // Cache-bust so the new image shows immediately (same path is upserted).
      const url = `${pub.publicUrl}?v=${Date.now()}`;

      const { error: rpcErr } = await supabase.rpc("set_content_block", {
        p_key: key,
        p_value: url,
      });
      if (rpcErr) throw rpcErr;

      setSrcByKey((p) => ({ ...p, [key]: url }));
      setStatusKey({ key, msg: "Uploaded. Live on the site within a minute." });
      closeFraming();
    } catch (err) {
      setError(
        (err instanceof Error ? err.message : "Upload failed.") +
          " If this is the first time, make sure the Supabase setup (site-images.sql) has been run.",
      );
    } finally {
      setBusyKey(null);
    }
  }

  async function onReset(key: string, defaultSrc: string) {
    setError(null);
    setStatusKey(null);
    setBusyKey(key);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: rpcErr } = await supabase.rpc("delete_content_block", { p_key: key });
      if (rpcErr) throw rpcErr;
      setSrcByKey((p) => ({ ...p, [key]: defaultSrc }));
      setStatusKey({ key, msg: "Reset to the original image." });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset failed.");
    } finally {
      setBusyKey(null);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
      {/* Left page menu */}
      <nav className="lg:sticky lg:top-24 lg:self-start">
        <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
          {groups.map((g) => (
            <li key={g.id}>
              <button
                type="button"
                onClick={() => setActive(g.id)}
                className={
                  "w-full whitespace-nowrap rounded-xl px-4 py-2.5 text-left text-sm transition " +
                  (g.id === active
                    ? "bg-cocoa-300 text-cream-50"
                    : "text-cocoa-300 hover:bg-cream-100")
                }
              >
                {g.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Selected page's images */}
      <div className="space-y-6">
        {error ? (
          <p className="rounded-lg bg-blush-100 px-4 py-3 text-sm text-cocoa-300">{error}</p>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-2">
          {group?.images.map((img) => {
            const isOverride = (values[img.key] ?? "") !== "" || srcByKey[img.key] !== img.defaultSrc;
            const busy = busyKey === img.key;
            return (
              <section
                key={img.key}
                className="rounded-2xl border border-sand-100 bg-cream-50 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-serif text-lg text-cocoa-300">{img.label}</h2>
                  {isOverride ? (
                    <span className="rounded-full bg-champagne-light/40 px-2.5 py-1 text-[10px] uppercase tracking-widest text-champagne-dark">
                      Custom
                    </span>
                  ) : (
                    <span className="rounded-full bg-cream-100 px-2.5 py-1 text-[10px] uppercase tracking-widest text-cocoa-50/70">
                      Original
                    </span>
                  )}
                </div>

                <div className={`mt-4 overflow-hidden rounded-xl bg-cream-100 ${img.aspect}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={srcByKey[img.key]}
                    alt={img.label}
                    className="h-full w-full object-cover"
                  />
                </div>

                {img.hint ? (
                  <p className="mt-3 text-xs text-cocoa-50/70">{img.hint}</p>
                ) : null}

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <label
                    className={
                      "cursor-pointer rounded-full bg-cocoa-300 px-5 py-2.5 text-[11px] uppercase tracking-widest text-cream-50 transition hover:bg-cocoa-200 " +
                      (busy ? "pointer-events-none opacity-40" : "")
                    }
                  >
                    {busy ? "Working…" : "Upload new"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={busy}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) onPick(img, f);
                        e.target.value = "";
                      }}
                    />
                  </label>
                  {isOverride ? (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => onReset(img.key, img.defaultSrc)}
                      className="rounded-full border border-sand-100 px-5 py-2.5 text-[11px] uppercase tracking-widest text-cocoa-300 transition hover:border-cocoa-300 disabled:opacity-40"
                    >
                      Reset
                    </button>
                  ) : null}
                  {statusKey?.key === img.key ? (
                    <span className="text-xs text-champagne-dark">{statusKey.msg}</span>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {framing ? (
        <ImageFramer
          framing={framing}
          busy={busyKey === framing.key}
          onCancel={closeFraming}
          onSave={onSaveFrame}
        />
      ) : null}
    </div>
  );
}

function ImageFramer({
  framing,
  busy,
  onCancel,
  onSave,
}: {
  framing: Framing;
  busy: boolean;
  onCancel: () => void;
  onSave: (area: Area) => void;
}) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);
  const onCropComplete = useCallback((_a: Area, pixels: Area) => setArea(pixels), []);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-cocoa-300/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-cream-50 shadow-2xl">
        <div className="flex items-center justify-between border-b border-sand-100 px-5 py-4">
          <h2 className="font-serif text-xl text-cocoa-300">Position {framing.label}</h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-sm uppercase tracking-widest text-cocoa-50 hover:text-cocoa-300"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-auto p-5">
          <div className="relative mx-auto h-[50vh] w-full overflow-hidden rounded-xl bg-cocoa-300">
            <Cropper
              image={framing.src}
              crop={crop}
              zoom={zoom}
              aspect={framing.aspect}
              minZoom={1}
              maxZoom={4}
              objectFit="cover"
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          <label className="mt-5 block text-xs uppercase tracking-widest text-cocoa-50">
            Zoom
            <input
              type="range"
              min={1}
              max={4}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="mt-2 w-full accent-cocoa-300"
            />
          </label>

          <p className="mt-3 text-xs text-cocoa-50/70">
            Drag the photo to reposition it, and zoom to resize it within the
            frame. The frame shows exactly how it will appear on the website.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-sand-100 px-5 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-sand-200 px-5 py-2.5 text-xs uppercase tracking-wider text-cocoa-300 transition hover:border-cocoa-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => area && onSave(area)}
            disabled={!area || busy}
            className="rounded-full bg-cocoa-300 px-6 py-2.5 text-xs uppercase tracking-wider text-cream-50 transition hover:bg-cocoa-200 disabled:opacity-40"
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
