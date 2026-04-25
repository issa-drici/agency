import Link from "next/link";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { ButtonLink } from "@/components/molecules/ButtonLink";

export function LegalTopNav() {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-[#e7e5e4] backdrop-blur-md"
      style={{ background: "rgba(250,250,249,0.92)" }}
    >
      <div className="mx-auto flex h-[60px] max-w-[1140px] items-center justify-between px-8">
        <Link href="/" className="inline-flex items-center" aria-label="Fortyn - accueil">
          <BrandLogo size="md" />
        </Link>
        <div className="flex items-center gap-5">
          <ButtonLink href="/login" variant="textMuted" size="sm" className="hidden px-0 sm:inline-flex">
            Se connecter
          </ButtonLink>
          <ButtonLink href="/chat" variant="dark" size="sm" className="rounded px-5">
            Demarrer mon audit →
          </ButtonLink>
        </div>
      </div>
    </nav>
  );
}
