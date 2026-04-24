import Image from "next/image";

/** Hauteurs proches des usages courants : footer compact (24px), nav / cartes (32px), en-tête un peu plus marqué (36px). */
const SIZES = {
  sm: { width: 88, height: 24, className: "h-6" },
  md: { width: 120, height: 32, className: "h-8" },
  lg: { width: 144, height: 36, className: "h-9" },
} as const;

type BrandLogoProps = {
  size?: keyof typeof SIZES;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ size = "md", className = "", priority = false }: BrandLogoProps) {
  const s = SIZES[size];
  return (
    <Image
      src="/images/logo.png"
      alt="CREWDEV"
      width={s.width}
      height={s.height}
      className={`${s.className} w-auto object-contain object-left ${className}`.trim()}
      priority={priority}
    />
  );
}
