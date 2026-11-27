import Image from "next/image";
import { profile } from "@/lib/data";

/** Cut-out portrait on an accent glow. Size it from the parent; the frame keeps a 4:5 ratio. */
export default function Portrait({
  sizes,
  priority = false,
}: {
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-md">
      {/* Accent glow behind the cut-out portrait (background removed from profile-hd.png) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(55% 45% at 50% 40%, color-mix(in srgb, var(--color-accent) 30%, transparent), transparent 72%)",
            "radial-gradient(90% 55% at 50% 105%, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 70%)",
          ].join(", "),
        }}
      />
      <Image
        src="/profile-cutout.webp"
        alt={`Portrait of ${profile.name}`}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
      />
    </div>
  );
}
