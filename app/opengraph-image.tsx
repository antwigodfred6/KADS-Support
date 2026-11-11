import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "KADS Support: supported accommodation and support for young people aged 16+";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read once at module scope (doesn't depend on the request), so the image stays prerendered
const logoData = await readFile(join(process.cwd(), "public/brand/kads-logo-on-dark.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

/** Link-preview image, using the client's original logo artwork (on-dark version). */
export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#323F48", padding: "64px 80px", gap: 72 }}>
        <img src={logoSrc} width={398} height={450} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 28, flex: 1 }}>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 800, lineHeight: 1.06, color: "#F7F4EE", letterSpacing: -2 }}>
            A steady place to find your own path.
          </div>
          <div style={{ display: "flex", fontSize: 30, lineHeight: 1.35, color: "#C9D6DE" }}>
            Supported accommodation, training and guidance for young people aged 16+
          </div>
          <div style={{ display: "flex", width: 120, height: 8, borderRadius: 8, background: "#EA924A" }} />
        </div>
      </div>
    ),
    size
  );
}
