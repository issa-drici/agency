import { ReactNode } from "react";
import { BrandLogo } from "@/components/atoms/BrandLogo";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <section className="w-full max-w-[420px] rounded-xl border border-white/10 bg-[#111827] p-6 sm:p-10">
      <div className="mb-8 flex items-center gap-3">
        <BrandLogo size="md" />
        <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-sky-500" />
      </div>

      <h1 className="font-serif text-[28px] text-white">{title}</h1>
      <p className="mt-2 text-sm text-slate-400">{subtitle}</p>

      <div className="mt-8">{children}</div>
    </section>
  );
}
