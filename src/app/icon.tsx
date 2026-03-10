import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#C8FF00",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 18,
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
