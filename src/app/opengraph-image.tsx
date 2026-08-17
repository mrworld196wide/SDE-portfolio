import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          backgroundColor: "#0a0a0b",
          backgroundImage:
            "linear-gradient(to bottom right, rgba(255,90,31,0.14), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#ff5a1f", fontFamily: "monospace", letterSpacing: 4 }}>
          {profile.currentTitle.toUpperCase()} · {profile.currentCompanyShort.toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 92, color: "#f8f8f9", fontWeight: 600, marginTop: 24 }}>
          {profile.name}
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#a0a0a7", marginTop: 20, maxWidth: 900 }}>
          {profile.positioning}
        </div>
      </div>
    ),
    { ...size },
  );
}
