import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

// Auto-wired by Next.js into both og:image and twitter:image.
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #070710 0%, #0d0d18 55%, #11111f 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 30,
            color: "#a5b4fc",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #6366f1, #22d3ee)",
              color: "#ffffff",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            {site.initials}
          </div>
          Portfolio
        </div>
        <div
          style={{
            fontSize: 78,
            fontWeight: 800,
            marginTop: 36,
            color: "#ffffff",
          }}
        >
          {site.name}
        </div>
        <div style={{ fontSize: 40, marginTop: 14, color: "#94a3b8" }}>
          {site.role}
        </div>
      </div>
    ),
    { ...size }
  );
}
