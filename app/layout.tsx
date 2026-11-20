import type { Metadata } from "next";
import { Anton, Plus_Jakarta_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const title = "Cedrex Castigon — BSIT Student & Aspiring Developer";
const description =
  "Portfolio of Cedrex Castigon, a 2nd-year BSIT student at Holy Cross of Davao College building practical software and exploring UI/UX design.";

// Absolute base for link-preview URLs (the share image comes from app/opengraph-image.tsx).
// On Vercel this is the production domain automatically; set NEXT_PUBLIC_SITE_URL for other hosts.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: { title, description, type: "website", siteName: "Cedrex Castigon" },
  twitter: { card: "summary_large_image", title, description },
};

// Runs before first paint: saved choice → otherwise the OS setting. Prevents a
// light-mode flash for dark-mode visitors. Must match ThemeToggle's logic.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${jakarta.variable} ${anton.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="isolate min-h-full bg-bg font-sans text-ink">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
