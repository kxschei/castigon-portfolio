import Image from "next/image";
import { profile } from "@/lib/data";

/**
 * Full, uncropped portrait photo. The frame uses the photo's own ratio (1148×1303),
 * so nothing is cut off. Size it from the parent.
 */
export default function Portrait({
  sizes,
  priority = false,
}: {
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className="group relative aspect-[1148/1303] w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-md">
      <Image
        src="/portrait-full.jpg"
        alt={`Portrait of ${profile.name}`}
        fill
        priority={priority}
        quality={90}
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
      />
    </div>
  );
}
