import Link from "next/link";
import { type ComponentProps, ReactNode } from "react";
import {
  type ButtonSize,
  type ButtonVariant,
  buttonSizeClasses,
  buttonVariantClasses,
} from "@/components/atoms/Button";

type ButtonLinkVariant = ButtonVariant | "outlineLight" | "text" | "textMuted";
type ButtonLinkSize = ButtonSize;

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  children: ReactNode;
  className?: string;
  variant?: ButtonLinkVariant;
  size?: ButtonLinkSize;
};

const variantClasses: Record<ButtonLinkVariant, string> = {
  ...buttonVariantClasses,
  outlineLight:
    "border border-white/15 bg-white/5 text-slate-200 hover:border-white/30 hover:bg-white/10 hover:text-white",
  text: "text-sky-600 hover:text-sky-500",
  textMuted: "text-[#78716c] hover:text-[#57534e]",
};

export function ButtonLink({
  children,
  className = "",
  variant = "accent",
  size = "md",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-md no-underline transition ${variantClasses[variant]} ${buttonSizeClasses[size]} ${className}`.trim()}
      {...props}
    >
      {children}
    </Link>
  );
}
