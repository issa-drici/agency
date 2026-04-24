import { ReactNode } from "react";
import { Label } from "@/components/atoms/Label";

type FormFieldProps = {
  htmlFor: string;
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  children: ReactNode;
};

export function FormField({
  htmlFor,
  label,
  required = false,
  error,
  helpText,
  children,
}: FormFieldProps) {
  const messageId = `${htmlFor}-message`;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} required={required} variant={error ? "error" : "default"}>
        {label}
      </Label>
      {children}
      {error ? (
        <p id={messageId} className="text-xs text-rose-300">
          {error}
        </p>
      ) : null}
      {!error && helpText ? (
        <p id={messageId} className="text-xs text-slate-400">
          {helpText}
        </p>
      ) : null}
    </div>
  );
}
