// Registry of copy the owner can edit from the dashboard → Content page.
// Organised by page. Each field's `default` is the current wording; the editor
// pre-fills boxes with it and the site falls back to it when there's no
// override. Add a field here, then read it where it renders with cval()/cflag().
//
// NOTE: the public marketing pages currently render static copy. These fields
// are wired progressively; editing them is safe and forward-compatible.

export type TextField = {
  key: string;
  label: string;
  type: "text" | "textarea";
  default: string;
  help?: string;
};
export type ToggleField = {
  key: string;
  label: string;
  type: "toggle";
  default: boolean;
  help?: string;
};
export type EditableField = TextField | ToggleField;
export type EditableGroup = { title: string; description?: string; fields: EditableField[] };
export type EditablePage = { id: string; label: string; groups: EditableGroup[] };

export const editablePages: EditablePage[] = [
  {
    id: "home",
    label: "Home",
    groups: [
      {
        title: "Hero",
        fields: [
          {
            key: "home.hero.subtitle",
            label: "Intro paragraph",
            type: "textarea",
            default:
              "Most owners settle for an accountant who goes quiet between deadlines. You don't have to. Switch Books matches you with a local firm that's proactive, speaks plain English and picks up the phone.",
          },
        ],
      },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    groups: [
      {
        title: "Top of the page",
        fields: [
          { key: "contact.hero.eyebrow", label: "Small label", type: "text", default: "Get in touch" },
          {
            key: "contact.hero.title",
            label: "Heading",
            type: "text",
            default: "Let's talk about your business.",
          },
          {
            key: "contact.hero.intro",
            label: "Intro paragraph",
            type: "textarea",
            default:
              "Prefer to start the easy way? Take the free review and we'll come back to you. Or send a message and we'll reply within one working day.",
          },
        ],
      },
    ],
  },
];

// Flat key→default lookup used by cval()/cflag() so pages don't need to repeat
// the default copy inline.
export const contentDefaults: Record<string, string> = (() => {
  const d: Record<string, string> = {};
  for (const p of editablePages) {
    for (const g of p.groups) {
      for (const f of g.fields) {
        d[f.key] = f.type === "toggle" ? (f.default ? "true" : "false") : f.default;
      }
    }
  }
  return d;
})();
