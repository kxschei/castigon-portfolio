import Image from "next/image";
import { profile } from "@/lib/data";

// Fixed dark studio backdrop (same in light and dark theme, like a photo backdrop)
const BACKDROP_TOP = "#1c1c1b";
const BACKDROP_BOTTOM = "#0f0f0e";

/**
 * Studio-style portrait: transparent cut-out on a dark backdrop with a soft light behind
 * the head and the shoulders fading out at the bottom. Size it from the parent; the frame
 * keeps a 4:5 ratio. The photo is drawn at 115% of the frame width (see `sizes`).
 */
export default function Portrait({
  sizes,
  priority = false,
}: {
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 shadow-md"
      style={{
        backgroundImage: [
          "radial-gradient(45% 32% at 50% 30%, rgba(255,255,255,0.07), transparent 70%)",
          `linear-gradient(180deg, ${BACKDROP_TOP}, ${BACKDROP_BOTTOM})`,
        ].join(", "),
      }}
    >
      {/* Square photo, a bit wider than the frame and anchored to the bottom, leaving headroom */}
      <div className="absolute bottom-0 left-1/2 aspect-square w-[115%] -translate-x-1/2">
        <Image
          src="/profile-cutout.png"
          alt={`Portrait of ${profile.name}`}
          fill
          priority={priority}
          quality={90}
          sizes={sizes}
          className="origin-bottom object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
      </div>

      {/* Shoulders fade into the backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
        style={{ background: `linear-gradient(to top, ${BACKDROP_BOTTOM} 12%, transparent)` }}
      />
    </div>
  );
}
