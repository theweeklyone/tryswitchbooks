# Switch Books

Marketing site + lead engine for **Switch Books** — a free service that matches UK
business owners (Sussex in particular) with the right **local accounting firm**.
Switch Books is an introduction/matching service; it does **not** provide the
accounting itself, and the owner stays anonymous.

Built with Next.js (App Router), TypeScript, Tailwind CSS, Supabase and Resend.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

> Keep the project **off OneDrive** (e.g. under `C:\dev`). OneDrive locks the
> `.next` build folder's reparse points and breaks `next build`.

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS — navy & gold palette (`tailwind.config.ts`)
- Lora (headings) + Inter (body) + Cormorant Garamond (wordmark)
- Supabase (leads + admin auth) · Resend (lead-alert emails)

## Brand

- **Name:** Switch Books
- **Tagline:** The right local accountant, matched to your business
- **Promise:** Free, independent matching service
- **Palette:** deep navy, warm gold accent, soft warm-white backgrounds
- **Logo:** stacked wordmark — "Switch" in display serif + "BOOKS" with hairline rules (`src/components/Logo.tsx`)

## Key routes

| Path | Description |
| --- | --- |
| `/` | Homepage |
| `/services`, `/services/[slug]` | What we match you with (5 areas) |
| `/how-it-works` | The match process |
| `/consultation` | The free Business Review quiz (lead capture) |
| `/advice`, `/advice/[slug]` | Insights articles |
| `/contact` | Contact form |
| `/dashboard/*` | Private, auth-gated lead dashboard (owner only) |
| `/privacy`, `/terms`, `/cookies` | Legal |

## How leads flow

1. A business owner completes the **free review** at `/consultation`.
2. The submission is scored (hot/warm/cool + indicative value), saved to Supabase,
   and **emailed to the owner** (`LEAD_NOTIFY_TO`). The owner stays anonymous.
3. The owner picks it up in `/dashboard/leads`, then introduces the client to a
   suitable local accounting firm.

## Configuration

All business details live in `src/data/site.ts`. Copy `.env.example` → `.env.local`
and fill in Supabase + Resend keys. Run `supabase/leads-accounting.sql` and
`supabase/auth-setup.sql` in the Supabase SQL editor.

| Placeholder | Where |
| --- | --- |
| Phone number (`01000 000000`) | `src/data/site.ts` |
| Email (`enquiries@tryswitchbooks.co.uk`) | `src/data/site.ts` |
| Domain (`tryswitchbooks.co.uk`) | `src/data/site.ts`, JSON-LD, sitemap, robots |
| Lead alert inbox | `LEAD_NOTIFY_TO` in `.env.local` |
| Admin email (dashboard) | `supabase/auth-setup.sql` |
