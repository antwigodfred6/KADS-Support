import { ImageResponse } from "next/og";

export const alt = "KADS Support: supported accommodation and support for young people aged 16+";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function Figure({ color, w, h, headR }: { color: string; w: number; h: number; headR: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: headR * 2, height: headR * 2, borderRadius: 999, background: color, marginBottom: 8 }} />
      <div style={{ width: w, height: h, background: color, borderTopLeftRadius: w / 2.4, borderTopRightRadius: w / 2.4 }} />
    </div>
  );
}

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0E2A3D", padding: 72, position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 700 }}>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, color: "#F7F4EE", letterSpacing: -1 }}>
            K<span style={{ color: "#EA924A" }}>A</span>D<span style={{ color: "#EA924A" }}>S</span>
            <span style={{ marginLeft: 16, fontSize: 22, fontWeight: 600, color: "#C9D6DE", letterSpacing: 6, alignSelf: "center" }}>SUPPORT</span>
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.04, color: "#F7F4EE", letterSpacing: -2 }}>
            A steady place to find your own path.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#C9D6DE" }}>Supported accommodation, training and guidance for young people 16+</div>
        </div>
        {/* Painted in order: teal, orange, then navy in front (z-index isn't supported here) */}
        <div style={{ position: "absolute", right: 250, bottom: 0, display: "flex" }}>
          <Figure color="#278CA5" w={130} h={250} headR={56} />
        </div>
        <div style={{ position: "absolute", right: 70, bottom: 0, display: "flex" }}>
          <Figure color="#EA924A" w={125} h={225} headR={54} />
        </div>
        <div style={{ position: "absolute", right: 165, bottom: 0, display: "flex" }}>
          <Figure color="#0B4260" w={120} h={190} headR={50} />
        </div>
      </div>
    ),
    size
  );
}
