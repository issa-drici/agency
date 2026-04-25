import Link from "next/link";
import { BrandLogo } from "@/components/atoms/BrandLogo";

export function LegalFooter() {
  return (
    <footer className="mt-12 border-t border-[#e7e5e4] bg-[#fafaf9]">
      <div className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-between gap-4 px-8 py-8">
        <Link href="/" className="inline-flex" aria-label="Fortyn - accueil">
          <BrandLogo size="sm" />
        </Link>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-600">
          <Link href="/privacy" className="underline underline-offset-2 hover:text-sky-600">
            Politique de confidentialite
          </Link>
          <Link href="/terms" className="underline underline-offset-2 hover:text-sky-600">
            Conditions d'utilisation
          </Link>
          <Link href="/data-deletion" className="underline underline-offset-2 hover:text-sky-600">
            Suppression des donnees
          </Link>
          <Link href="/legal-notice" className="underline underline-offset-2 hover:text-sky-600">
            Mentions legales
          </Link>
          <Link href="/contact" className="underline underline-offset-2 hover:text-sky-600">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
