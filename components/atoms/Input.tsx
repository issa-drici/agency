"use client";

import { InputHTMLAttributes, useState } from "react";

type InputVariant = "default" | "error";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant;
  /** Quand `type="password"`, affiche le bouton œil (désactivable). */
  passwordToggle?: boolean;
};

const variantClasses: Record<InputVariant, string> = {
  default:
    "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-500",
  error:
    "border-rose-400/70 bg-white text-slate-900 placeholder:text-slate-400 focus:border-rose-500",
};

function IconEyeOpen({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function IconEyeSlash({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
}

export function Input({
  variant = "default",
  passwordToggle = true,
  className = "",
  type,
  disabled,
  ...props
}: InputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const showPasswordToggle = type === "password" && passwordToggle;

  const innerClass =
    `h-11 w-full rounded-md border px-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-70 ${variantClasses[variant]} ${showPasswordToggle ? "pr-10" : ""}`.trim();

  const fieldClass = `${innerClass} ${className}`.trim();

  if (!showPasswordToggle) {
    return (
      <input
        type={type}
        disabled={disabled}
        className={fieldClass}
        {...props}
      />
    );
  }

  return (
    <div className={`relative w-full ${className}`.trim()}>
      <input
        type={passwordVisible ? "text" : "password"}
        disabled={disabled}
        className={innerClass}
        {...props}
      />
      <button
        type="button"
        disabled={disabled}
        aria-label={passwordVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        aria-pressed={passwordVisible}
        onClick={() => setPasswordVisible((v) => !v)}
        className="absolute inset-y-0 right-0 flex w-10 cursor-pointer items-center justify-center rounded-r-md text-slate-500 outline-none hover:text-slate-800 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {passwordVisible ? (
          <IconEyeOpen className="h-5 w-5 shrink-0" />
        ) : (
          <IconEyeSlash className="h-5 w-5 shrink-0" />
        )}
      </button>
    </div>
  );
}
