import { clsx } from "@/lib/utils";

// Lightweight, dependency-free charts for the analytics dashboard.
// Warm, on-brand palette; all server-renderable (no client JS).

export const PALETTE = [
  "#C2877C", // dusty rose
  "#B8956A", // gold
  "#D8A9A0", // blush
  "#C9A87E", // light gold
  "#9C8B7D", // taupe
  "#7E6B5E", // cocoa taupe
];

const INK = "#15110F";
const MUTED = "#5C544F";

/** Up/down change badge. */
export function Delta({ value, point = false }: { value: number; point?: boolean }) {
  const up = value >= 0;
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 text-xs font-medium",
        up ? "text-emerald-600" : "text-rose-500",
      )}
    >
      <span aria-hidden>{up ? "▲" : "▼"}</span>
      {up ? "+" : "−"}
      {Math.abs(value)}
      {point ? " pts" : "%"}
    </span>
  );
}

/** Tiny trend line for KPI cards. */
export function Sparkline({
  data,
  color = "#B8956A",
  width = 104,
  height = 32,
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const pts = data.map((v, i) => [i * step, height - 3 - ((v - min) / range) * (height - 6)]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L ${width} ${height} L 0 ${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={area} fill={color} opacity={0.12} />
      <path d={line} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Area trend over a period (the time dimension). */
export function AreaTrend({
  data,
  color = "#C2877C",
  height = 190,
}: {
  data: { month: string; value: number }[];
  color?: string;
  height?: number;
}) {
  const width = 640;
  const pad = 26;
  const values = data.map((d) => d.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;
  const step = innerW / (data.length - 1);
  const pts = data.map((d, i) => [pad + i * step, pad + innerH - ((d.value - min) / range) * innerH]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L ${pad + innerW} ${pad + innerH} L ${pad} ${pad + innerH} Z`;
  const last = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Enquiries over time">
      <defs>
        <linearGradient id="trendfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#trendfill)" />
      <path d={line} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <g key={data[i].month}>
          <circle cx={p[0]} cy={p[1]} r={3.5} fill={color} />
          <text x={p[0]} y={height - 7} textAnchor="middle" fontSize={12} fill={MUTED}>
            {data[i].month}
          </text>
        </g>
      ))}
      <text x={last[0]} y={last[1] - 11} textAnchor="end" fontSize={14} fontWeight={600} fill={INK}>
        {data[data.length - 1].value}
      </text>
    </svg>
  );
}

/** Donut with legend. */
export function DonutChart({
  segments,
  centerLabel,
  centerSub,
  size = 184,
  thickness = 26,
}: {
  segments: { label: string; value: number }[];
  centerLabel?: string;
  centerSub?: string;
  size?: number;
  thickness?: number;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
      <svg width={size} height={size} className="shrink-0">
        <circle cx={c} cy={c} r={r} fill="none" stroke="#EBE3D9" strokeWidth={thickness} />
        {segments.map((seg, i) => {
          const frac = seg.value / total;
          const dash = `${frac * circ} ${circ}`;
          const offset = -acc * circ;
          acc += frac;
          return (
            <circle
              key={seg.label}
              cx={c}
              cy={c}
              r={r}
              fill="none"
              stroke={PALETTE[i % PALETTE.length]}
              strokeWidth={thickness}
              strokeDasharray={dash}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${c} ${c})`}
            />
          );
        })}
        {centerLabel ? (
          <text x={c} y={c - 1} textAnchor="middle" fontFamily="var(--font-display)" fontSize={30} fill={INK}>
            {centerLabel}
          </text>
        ) : null}
        {centerSub ? (
          <text x={c} y={c + 19} textAnchor="middle" fontSize={11} fill={MUTED}>
            {centerSub}
          </text>
        ) : null}
      </svg>
      <ul className="w-full space-y-2 text-sm">
        {segments.map((seg, i) => (
          <li key={seg.label} className="flex items-center gap-2.5">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: PALETTE[i % PALETTE.length] }}
            />
            <span className="text-cocoa-300">{seg.label}</span>
            <span className="ml-auto tabular-nums text-cocoa-50">
              {Math.round((seg.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Ranked horizontal bars. */
export function HBars({
  items,
}: {
  items: { label: string; value: number; valueLabel?: string; caption?: string }[];
}) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <ul className="space-y-3.5">
      {items.map((it, i) => (
        <li key={it.label}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="text-cocoa-300">{it.label}</span>
            <span className="shrink-0 tabular-nums text-cocoa-50">
              {it.valueLabel ?? it.value}
            </span>
          </div>
          <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-sand-100">
            <div
              className="h-full rounded-full"
              style={{ width: `${(it.value / max) * 100}%`, background: PALETTE[i % PALETTE.length] }}
            />
          </div>
          {it.caption ? <p className="mt-1 text-xs text-cocoa-50/70">{it.caption}</p> : null}
        </li>
      ))}
    </ul>
  );
}

/** Tapering conversion funnel. */
export function Funnel({ steps }: { steps: { stage: string; count: number }[] }) {
  const top = steps[0]?.count || 1;
  return (
    <ul className="space-y-2.5">
      {steps.map((s, i) => {
        const pct = Math.round((s.count / top) * 100);
        const kept = i > 0 ? Math.round((s.count / steps[i - 1].count) * 100) : null;
        return (
          <li key={s.stage}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-cocoa-300">{s.stage}</span>
              <span className="shrink-0 tabular-nums text-cocoa-50">
                {s.count}
                {kept !== null ? (
                  <span className="ml-2 text-xs text-cocoa-50/60">{kept}% kept</span>
                ) : null}
              </span>
            </div>
            <div className="mt-1.5 flex justify-center">
              <div
                className="h-7 rounded-md"
                style={{
                  width: `${pct}%`,
                  background: PALETTE[Math.min(i, PALETTE.length - 1)],
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Small "what this means" helper note. */
export function Insight({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 rounded-xl bg-blush-50 px-4 py-3 text-sm leading-relaxed text-cocoa-300">
      <span className="font-medium">What this means: </span>
      {children}
    </p>
  );
}
