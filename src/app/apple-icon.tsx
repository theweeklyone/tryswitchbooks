import { ImageResponse } from "next/og";

// Apple touch icon. iOS applies its own rounded corners and ignores transparency,
// so we render a full-bleed navy tile with the gold Switch Books calculator,
// mirroring icon.svg. 180×180 is Apple's recommended size. Emitting this file
// makes Next add <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon">.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#14213D",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          {/* Calculator body */}
          <rect x="20" y="12" width="24" height="40" rx="4" fill="#C9A24B" />
          {/* Screen */}
          <rect x="24" y="16.5" width="16" height="8" rx="1.5" fill="#14213D" />
          {/* Buttons */}
          <g fill="#14213D">
            <circle cx="26.5" cy="31" r="1.7" />
            <circle cx="32" cy="31" r="1.7" />
            <circle cx="37.5" cy="31" r="1.7" />
            <circle cx="26.5" cy="37.5" r="1.7" />
            <circle cx="32" cy="37.5" r="1.7" />
            <circle cx="37.5" cy="37.5" r="1.7" />
            <circle cx="26.5" cy="44" r="1.7" />
            <circle cx="32" cy="44" r="1.7" />
            <circle cx="37.5" cy="44" r="1.7" />
          </g>
        </svg>
      </div>
    ),
    { ...size },
  );
}
