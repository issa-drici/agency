import { ReactNode } from "react";
import { ButtonLink } from "@/components/molecules/ButtonLink";

type AuthPageLayoutProps = {
  children: ReactNode;
  showBackLink?: boolean;
};

export function AuthPageLayout({
  children,
  showBackLink = false,
}: AuthPageLayoutProps) {
  return (
    <main className="min-h-screen bg-[#0c1322] px-4 py-6 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col justify-center">
        {showBackLink ? (
          <div className="mb-8">
            <ButtonLink
              href="/"
              variant="outlineLight"
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1322]"
            >
              <span aria-hidden>←</span>
              Retour à l&apos;accueil
            </ButtonLink>
          </div>
        ) : null}

        <div className="flex justify-center">{children}</div>
      </div>
    </main>
  );
}
