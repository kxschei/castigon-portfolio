import Image from "next/image";
import { profile } from "@/lib/data";

/** Full-bleed 4:5 portrait photo with a soft dark fade at the bottom. Size it from the parent. */
export default function Portrait({
  sizes,
  priority = false,
}: {
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-md">
      <Image
        src="/portrait.jpg"
        alt={`Portrait of ${profile.name}`}
        fill
        priority={priority}
        quality={90}
        sizes={sizes}
        className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
      />

      {/* Bottom fade so the photo settles into the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent"
      />
    </div>
  );
}
