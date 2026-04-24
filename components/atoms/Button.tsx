import { ButtonHTMLAttributes } from "react";

export const buttonVariantClasses = {
  accent: "bg-sky-500 text-white hover:bg-sky-400 shadow-sm",
  dark: "bg-[#0c1322] text-white hover:bg-[#111b32] shadow-sm",
  secondary:
    "border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900",
  dangerGhost: "bg-transparent text-rose-600 hover:text-rose-500",
} as const;

export const buttonSizeClasses = {
  sm: "h-10 px-3 text-sm font-medium",
  md: "h-11 px-4 text-sm font-semibold",
  lg: "h-12 px-8 text-[15px] font-medium",
  inline: "h-auto px-0 text-sm font-medium",
} as const;

export type ButtonVariant = keyof typeof buttonVariantClasses;
export type ButtonSize = keyof typeof buttonSizeClasses;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export function Button({
  variant = "accent",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`cursor-pointer rounded-md transition disabled:cursor-not-allowed disabled:opacity-70 ${buttonVariantClasses[variant]} ${
        buttonSizeClasses[size]
      } ${fullWidth ? "w-full" : ""} ${className}`.trim()}
      {...props}
    />
  );
}
