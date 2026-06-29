import type { Metadata } from "next";
import { getContentMap } from "@/lib/content";
import { editableImages } from "@/data/editable-images";
import { SiteImagesManager } from "@/components/dashboard/SiteImagesManager";

export const metadata: Metadata = { title: "Images" };
export const revalidate = 0;

export default async function ImagesPage() {
  const values = await getContentMap();

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-serif text-3xl text-cocoa-300">Site images</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-cocoa-50">
          Swap the main photos on the site. Pick a page on the left, upload a
          new image, and it appears on the website within a minute. Press
          &ldquo;Reset&rdquo; any time to go back to the original.
        </p>
      </header>
      <SiteImagesManager groups={editableImages} values={values} />
    </div>
  );
}
