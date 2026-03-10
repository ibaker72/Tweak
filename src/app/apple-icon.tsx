import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "#C8FF00",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 100,
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
    ),
    { ...size }
  );
}
