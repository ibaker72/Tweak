import { ImageResponse } from "next/og";

export const alt = "Tweak & Build — Premium Product Engineering Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#030305",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "#C8FF00",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: "#030305",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            T
          </div>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: "#ffffff",
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            display: "flex",
            gap: 0,
          }}
        >
          <span>Tweak</span>
          <span style={{ color: "#C8FF00" }}>&</span>
          <span>Build</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: "#8E8EA0",
            fontFamily: "system-ui, sans-serif",
            marginTop: 16,
            letterSpacing: "-0.01em",
          }}
        >
          Premium Product Engineering Studio
        </div>

        {/* Accent line */}
        <div
          style={{
            width: 80,
            height: 3,
            borderRadius: 2,
            background: "#C8FF00",
            marginTop: 32,
            opacity: 0.6,
          }}
        />

        {/* Bottom tagline */}
        <div
          style={{
            fontSize: 16,
            color: "#4B4B60",
            fontFamily: "system-ui, monospace",
            marginTop: 24,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}
        >
          Websites · Web Apps · Automation
        </div>
      </div>
    ),
    { ...size }
  );
}
