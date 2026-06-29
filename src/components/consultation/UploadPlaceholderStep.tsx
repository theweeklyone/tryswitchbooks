"use client";

import { useRef, useState } from "react";
import { clsx } from "@/lib/utils";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

// Inspiration photo upload. Each photo uploads to the private
// `inspiration-photos` Supabase bucket and we store its storage path. The team
// views them in the dashboard through short-lived signed URLs, so photos are
// never public. A failed upload simply is not attached, the quiz never breaks.

const BUCKET = "inspiration-photos";
const MAX_PHOTOS = 6;
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

type Item = {
  id: string;
  name: string;
  previewUrl?: string;
  path?: string;
  status: "uploading" | "done" | "error";
};

export function UploadPlaceholderStep({
  paths,
  onChange,
}: {
  paths: string[];
  onChange: (paths: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [drag, setDrag] = useState(false);
  // Seed from any already-uploaded paths (e.g. when stepping back), no preview.
  const [items, setItems] = useState<Item[]>(() =>
    paths.map((p, i) => ({ id: `seed-${i}`, name: "Photo", path: p, status: "done" as const })),
  );

  function emit(next: Item[]) {
    onChange(
      next.filter((i) => i.status === "done" && i.path).map((i) => i.path as string),
    );
  }

  async function uploadOne(file: File, id: string) {
    try {
      const supabase = createSupabaseBrowserClient();
      const ext =
        (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { contentType: file.type, upsert: false });
      if (error) throw error;
      setItems((prev) => {
        const next = prev.map((it) =>
          it.id === id ? { ...it, path, status: "done" as const } : it,
        );
        emit(next);
        return next;
      });
    } catch {
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, status: "error" as const } : it)),
      );
    }
  }

  function onFiles(files: FileList | null) {
    if (!files) return;
    const room = MAX_PHOTOS - items.length;
    if (room <= 0) return;
    const chosen = Array.from(files)
      .filter((f) => f.type.startsWith("image/") && f.size <= MAX_BYTES)
      .slice(0, room);
    const newItems: Item[] = chosen.map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      previewUrl: URL.createObjectURL(f),
      status: "uploading",
    }));
    setItems((prev) => [...prev, ...newItems]);
    newItems.forEach((it, idx) => uploadOne(chosen[idx], it.id));
  }

  function remove(id: string) {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      emit(next);
      return next;
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          onFiles(e.dataTransfer.files);
        }}
        className={clsx(
          "flex w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed bg-cream-100 px-6 py-14 text-center transition-colors",
          drag
            ? "border-cocoa-300 bg-blush-50/60"
            : "border-sand-200 hover:border-cocoa-300/70",
        )}
      >
        <span className="font-serif text-2xl text-cocoa-300">Drop photos here</span>
        <span className="text-sm text-cocoa-50">or tap to browse from your phone</span>
        <span className="text-[11px] uppercase tracking-widest text-cocoa-50/60">
          Optional · up to 6 photos
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => onFiles(e.target.files)}
        />
      </button>

      {items.length > 0 ? (
        <ul className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {items.map((it) => (
            <li
              key={it.id}
              className="relative overflow-hidden rounded-2xl border border-sand-100 bg-cream-50"
            >
              <div className="aspect-square bg-cream-100">
                {it.previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={it.previewUrl}
                    alt={it.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[11px] uppercase tracking-widest text-cocoa-50/60">
                    Photo
                  </div>
                )}
              </div>
              {it.status !== "done" ? (
                <div className="absolute inset-0 flex items-center justify-center bg-cream-50/75 text-[11px] uppercase tracking-widest text-cocoa-300">
                  {it.status === "uploading" ? "Uploading…" : "Failed"}
                </div>
              ) : null}
              <button
                type="button"
                onClick={() => remove(it.id)}
                className="absolute right-1.5 top-1.5 rounded-full bg-cocoa-300/85 px-2 py-0.5 text-[10px] uppercase tracking-widest text-cream-50"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <p className="mt-4 text-xs italic leading-relaxed text-cocoa-50/70">
        Your files upload securely and are only ever seen by us. They are
        never shared.
      </p>
    </div>
  );
}
