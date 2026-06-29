import type { Metadata } from "next";
import { fetchContactMessages } from "@/lib/messages/queries";

export const metadata: Metadata = {
  title: "Messages",
  description: "Contact-form enquiries from the website.",
};

// Always read fresh on every visit.
export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function MessagesPage() {
  const messages = await fetchContactMessages();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-cocoa-300">Messages</h1>
        <p className="mt-2 text-sm text-cocoa-50">
          Enquiries sent through the website contact form. The most recent are at
          the top.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-2xl border border-sand-100 bg-cream-50 p-10 text-center">
          <p className="text-sm text-cocoa-50">
            No contact-form messages yet. New ones will appear here automatically.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {messages.map((m) => (
            <li
              key={m.id}
              className="rounded-2xl border border-sand-100 bg-cream-50 p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-serif text-xl text-cocoa-300">{m.name}</h2>
                <span className="text-xs uppercase tracking-widest text-cocoa-50/70">
                  {formatDate(m.createdAt)}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-cocoa-50">
                <a
                  href={`mailto:${m.email}`}
                  className="text-champagne-dark underline-offset-2 hover:underline"
                >
                  {m.email}
                </a>
                {m.phone ? (
                  <a
                    href={`tel:${m.phone}`}
                    className="text-champagne-dark underline-offset-2 hover:underline"
                  >
                    {m.phone}
                  </a>
                ) : null}
                {m.service ? <span>Interested in: {m.service}</span> : null}
              </div>

              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-cocoa-300">
                {m.message}
              </p>

              <div className="mt-5">
                <a
                  href={`mailto:${m.email}?subject=${encodeURIComponent(
                    "Re: your enquiry to Switch Books",
                  )}`}
                  className="inline-flex items-center gap-2 rounded-full bg-cocoa-300 px-5 py-2.5 text-[11px] uppercase tracking-widest text-cream-50 transition hover:bg-cocoa-200"
                >
                  Reply by email
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
