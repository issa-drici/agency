import { LabelHTMLAttributes } from "react";

type LabelVariant = "default" | "error";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  variant?: LabelVariant;
  required?: boolean;
};

const variantClasses: Record<LabelVariant, string> = {
  default: "text-slate-500",
  error: "text-rose-300",
};

export function Label({
  variant = "default",
  required = false,
  children,
  className = "",
  ...props
}: LabelProps) {
  return (
    <label
      className={`text-[11px] tracking-[0.14em] uppercase font-medium ${variantClasses[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
      {required ? " *" : null}
    </label>
  );
}
