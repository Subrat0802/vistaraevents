import { ImageResponse } from "next/og";

export const alt =
  "Vistara Events – Best Event Management & Wedding Planner in Rewa, Satna, Sidhi & Jabalpur, Madhya Pradesh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #1A1A1A 0%, #2A1F12 60%, #1A1A1A 100%)",
          color: "#F9F5EE",
          padding: "60px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 30%, rgba(201,168,76,0.18) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 32,
          }}
        >
          <div style={{ width: 80, height: 1, background: "#C9A84C" }} />
          <span
            style={{
              fontSize: 22,
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "#E8C97A",
              fontWeight: 500,
            }}
          >
            Luxury Event Management
          </span>
          <div style={{ width: 80, height: 1, background: "#C9A84C" }} />
        </div>

        <div
          style={{
            fontSize: 168,
            fontWeight: 300,
            letterSpacing: "0.04em",
            lineHeight: 1,
            display: "flex",
          }}
        >
          VISTARA
        </div>
        <div
          style={{
            fontSize: 72,
            fontStyle: "italic",
            color: "#C9A84C",
            fontWeight: 300,
            marginTop: 8,
            display: "flex",
          }}
        >
          Events
        </div>

        <div
          style={{
            width: 96,
            height: 1,
            background: "#C9A84C",
            margin: "32px 0",
          }}
        />

        <div
          style={{
            fontSize: 30,
            color: "rgba(249,245,238,0.85)",
            fontWeight: 300,
            display: "flex",
          }}
        >
          Best Event &amp; Wedding Planner in Rewa, MP
        </div>
        <div
          style={{
            fontSize: 22,
            color: "rgba(249,245,238,0.55)",
            marginTop: 12,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Rewa · Satna · Sidhi · Jabalpur
        </div>
      </div>
    ),
    { ...size }
  );
}
