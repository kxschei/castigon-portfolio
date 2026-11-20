import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/lib/data";

// Link preview shown when the site is shared (Messenger, LinkedIn, Discord, X…).
// Mirrors the hero: dark theme, accent glow, Anton name with the square ".", portrait.

export const alt = `${profile.name}, ${profile.role.replace(/\.$/, "")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#ff3b1d";
const BG = "#0f0f0e";
const INK = "#edece8";
const MUTED = "#9b9a95";

const anton = await readFile(join(process.cwd(), "assets/fonts/Anton-Regular.ttf"));
const jakarta = await readFile(join(process.cwd(), "assets/fonts/PlusJakartaSans-Medium.woff"));
const portrait = `data:image/png;base64,${await readFile(join(process.cwd(), "public/profile-hd.png"), "base64")}`;

export default function Image() {
  const [first, ...rest] = profile.name.split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 88px",
          background: BG,
          backgroundImage: [
            "radial-gradient(circle at 18% 125%, rgba(255,59,29,0.55), rgba(255,59,29,0) 45%)",
            "radial-gradient(circle at 58% 135%, rgba(255,138,61,0.4), rgba(255,138,61,0) 40%)",
            "radial-gradient(circle at 92% 120%, rgba(214,20,60,0.45), rgba(214,20,60,0) 40%)",
          ].join(", "),
          color: INK,
          fontFamily: "Plus Jakarta Sans",
        }}
      >
        {/* Text column is capped so a long role line wraps instead of pushing the photo off */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 660 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Anton",
              fontSize: 148,
              lineHeight: 0.95,
              textTransform: "uppercase",
              letterSpacing: -2,
            }}
          >
            <span>{first}</span>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <span>{rest.join(" ")}</span>
              <div style={{ width: 30, height: 30, background: ACCENT, marginLeft: 8, marginBottom: 22 }} />
            </div>
          </div>

          <div style={{ marginTop: 30, fontSize: 34, lineHeight: 1.3, color: MUTED }}>{profile.role}</div>
        </div>

        <div
          style={{
            display: "flex",
            flexShrink: 0,
            width: 300,
            height: 375,
            borderRadius: 24,
            overflow: "hidden",
            border: "2px solid rgba(255,255,255,0.1)",
            background: "#fff",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
          <img src={portrait} width={300} height={375} style={{ objectFit: "cover" }} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      // First font is the default (body text); Anton only where asked for
      fonts: [
        { name: "Plus Jakarta Sans", data: jakarta, style: "normal", weight: 500 },
        { name: "Anton", data: anton, style: "normal", weight: 400 },
      ],
    },
  );
}
