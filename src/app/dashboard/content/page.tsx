import type { Metadata } from "next";
import { getContentMap } from "@/lib/content";
import { editablePages } from "@/data/editable";
import { ContentEditor } from "@/components/dashboard/ContentEditor";

export const metadata: Metadata = { title: "Content" };
export const revalidate = 0;

export default async function ContentPage() {
  const values = await getContentMap();

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-serif text-3xl text-cocoa-300">Site content</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-cocoa-50">
          Pick a page on the left, edit the wording (boxes are filled with
          what&rsquo;s on the site now), or show/hide sections. Clear a box to
          go back to the original. Changes appear on the website within a minute.
        </p>
      </header>
      <ContentEditor pages={editablePages} values={values} />
    </div>
  );
}
