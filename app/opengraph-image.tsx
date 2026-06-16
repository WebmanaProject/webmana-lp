import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Webmana — Your domains. One pane of glass.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#00FFAA";
const INK = "#04261C";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          backgroundImage: `radial-gradient(circle at 78% 22%, rgba(0,255,170,0.22), transparent 55%)`,
          padding: "72px 80px",
          fontFamily: "sans-serif",
          color: "#d7fff0",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: ACCENT,
              color: INK,
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            W
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#ffffff" }}>
            Webmana
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            Your domains.&nbsp;<span style={{ color: ACCENT }}>One pane of glass.</span>
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 940,
              fontSize: 32,
              lineHeight: 1.35,
              color: "#9ed9c6",
            }}
          >
            Self-hosted dashboard + MCP server for uptime, SSL, performance,
            security, and cost across every project — and it hands the data to your AI.
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 26,
            color: "#7fc9b3",
          }}
        >
          <span style={{ display: "flex", color: ACCENT }}>Self-hosted</span>
          <span style={{ display: "flex" }}>·</span>
          <span style={{ display: "flex", color: ACCENT }}>Open source</span>
          <span style={{ display: "flex" }}>·</span>
          <span style={{ display: "flex", color: ACCENT }}>AI-native (MCP)</span>
          <span style={{ display: "flex", marginLeft: "auto", fontFamily: "monospace", color: "#d7fff0" }}>
            docker compose up
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
