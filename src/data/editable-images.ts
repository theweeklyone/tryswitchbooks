// Registry of the site images the owner can swap from the dashboard → Images.
// Each image has a stable key (e.g. "image.home.hero"). An uploaded image is
// stored in the `site-images` Storage bucket and its URL saved in the same
// content_block table the wording uses, so getContentMap()/imageSrc() resolve
// it on top of the built-in default. Reset clears the override.
//
// NOTE: the public pages currently render these images by fixed path. Wiring a
// page to imageSrc(content, key) lets the owner swap it here without a redeploy.

export type EditableImage = {
  key: string;
  label: string;
  /** The bundled image shown until a custom one is uploaded. */
  defaultSrc: string;
  /** Tailwind aspect class used for the dashboard preview + upload guidance. */
  aspect: string;
  hint?: string;
};

export type EditableImageGroup = {
  id: string;
  label: string;
  images: EditableImage[];
};

export const editableImages: EditableImageGroup[] = [
  {
    id: "home",
    label: "Home",
    images: [
      {
        key: "image.home.hero",
        label: "Main hero image",
        defaultSrc: "/images/advisory-meeting.jpg",
        aspect: "aspect-[4/5]",
        hint: "Portrait or landscape advisory/meeting shot. Best around 1200×1500px.",
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    images: [
      {
        key: "image.services.hero",
        label: "Hero image",
        defaultSrc: "/images/business-reports.jpg",
        aspect: "aspect-[4/5]",
      },
    ],
  },
  {
    id: "howItWorks",
    label: "How it works",
    images: [
      {
        key: "image.howItWorks.hero",
        label: "Hero image",
        defaultSrc: "/images/meeting-report.jpg",
        aspect: "aspect-[4/5]",
      },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    images: [
      {
        key: "image.contact.hero",
        label: "Hero image",
        defaultSrc: "/images/office.jpg",
        aspect: "aspect-[4/5]",
      },
    ],
  },
  {
    id: "advice",
    label: "Insights",
    images: [
      {
        key: "image.advice.hero",
        label: "Hero image",
        defaultSrc: "/images/reviewing-reports.jpg",
        aspect: "aspect-[4/5]",
      },
    ],
  },
];

// Flat key→default lookup used by imageSrc() so call sites don't repeat paths.
export const imageDefaults: Record<string, string> = (() => {
  const d: Record<string, string> = {};
  for (const g of editableImages) {
    for (const img of g.images) d[img.key] = img.defaultSrc;
  }
  return d;
})();
