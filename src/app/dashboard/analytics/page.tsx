import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AreaTrend, DonutChart, HBars } from "@/components/dashboard/charts";
import { clsx } from "@/lib/utils";
import { fetchEnquiryStats } from "@/lib/analytics/queries";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Real enquiry analytics for Switch Books.",
  robots: { index: false, follow: false },
};

// Always read fresh.
export const dynamic = "force-dynamic";

function Panel({
  title,
  hint,
  children,
  className,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={clsx("rounded-2xl border border-sand-100 bg-cream-50 p-6 sm:p-7", className)}>
      <div className="mb-6">
        <h2 className="font-serif text-2xl text-cocoa-300">{title}</h2>
        {hint ? <p className="mt-1 text-sm text-cocoa-50">{hint}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Kpi({
  label,
  value,
  hint,
  primary,
}: {
  label: string;
  value: string;
  hint?: string;
  primary?: boolean;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border p-5",
        primary ? "border-champagne/40 bg-blush-50" : "border-sand-100 bg-cream-50",
      )}
    >
      <p className="text-[11px] uppercase tracking-widest text-cocoa-50/70">{label}</p>
      <p className="mt-2 font-serif text-3xl text-cocoa-300">{value}</p>
      {hint ? <p className="mt-1 text-[11px] text-cocoa-50/60">{hint}</p> : null}
    </div>
  );
}

export default async function AnalyticsPage() {
  const s = await fetchEnquiryStats();

  return (
    <>
      <DashboardHeader
        title="Analytics"
        subtitle="A real read on the enquiries coming through your website."
      />

      {s.total === 0 ? (
        <div className="rounded-2xl border border-sand-100 bg-cream-50 p-10 text-center">
          <p className="font-serif text-2xl text-cocoa-300">No enquiries yet.</p>
          <p className="mt-2 text-sm text-cocoa-50">
            As people use your consultation quiz and contact form, their enquiries
            and these figures will appear here automatically.
          </p>
        </div>
      ) : (
        <>
          {/* Real KPIs */}
          <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <Kpi label="Total enquiries" value={String(s.total)} primary hint="Consultation quiz leads" />
            <Kpi label="Last 7 days" value={String(s.last7)} />
            <Kpi label="New / unactioned" value={String(s.newCount)} />
            <Kpi label="Appointments booked" value={String(s.appointmentsBooked)} />
            <Kpi
              label="Conversion"
              value={s.conversionRate === null ? "–" : `${s.conversionRate}%`}
              hint="Booked vs not booked"
            />
            <Kpi label="Booked value" value={`£${s.bookedValueTotal.toLocaleString()}`} />
          </div>

          {/* Trend */}
          <Panel
            title="Enquiries over time"
            hint="Consultation enquiries per day, last 14 days."
            className="mb-8"
          >
            <AreaTrend data={s.trend} />
          </Panel>

          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <Panel title="Where enquiries come from" hint="By source.">
              {s.bySource.length ? (
                <DonutChart
                  segments={s.bySource}
                  centerLabel={String(s.total)}
                  centerSub="enquiries"
                />
              ) : (
                <p className="text-sm text-cocoa-50">No data yet.</p>
              )}
            </Panel>

            <Panel title="Most-wanted services" hint="From the recommendation each enquiry was matched to.">
              {s.byService.length ? (
                <HBars items={s.byService.map((x) => ({ ...x, valueLabel: String(x.value) }))} />
              ) : (
                <p className="text-sm text-cocoa-50">No data yet.</p>
              )}
            </Panel>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="Where enquiries are up to" hint="By status in your pipeline.">
              {s.byStatus.length ? (
                <HBars items={s.byStatus.map((x) => ({ ...x, valueLabel: String(x.value) }))} />
              ) : (
                <p className="text-sm text-cocoa-50">No data yet.</p>
              )}
            </Panel>

            <Panel title="Enquiry quality" hint="How warm your enquiries are.">
              {s.byPriority.length ? (
                <DonutChart segments={s.byPriority} centerLabel={String(s.total)} centerSub="enquiries" />
              ) : (
                <p className="text-sm text-cocoa-50">No data yet.</p>
              )}
              <p className="mt-5 text-sm text-cocoa-50">
                Plus <span className="font-medium text-cocoa-300">{s.messagesCount}</span>{" "}
                message{s.messagesCount === 1 ? "" : "s"} via the contact form.
              </p>
            </Panel>
          </div>
        </>
      )}

      <p className="mt-12 text-xs leading-relaxed text-cocoa-50/70">
        These figures are your real website enquiries. Visitor numbers, traffic
        sources and page views are tracked separately in{" "}
        <a
          href="https://analytics.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-cocoa-300 underline underline-offset-2"
        >
          Google Analytics
        </a>
        .
      </p>
    </>
  );
}
