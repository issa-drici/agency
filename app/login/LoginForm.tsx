"use client";

import Link from "next/link";
import { type SyntheticEvent, useState } from "react";
import { sendLoginLink } from "@/app/login/actions";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { isValidLoginPhoneNormalized, normalizeLoginPhone } from "@/lib/login-phone";

type LoginFormProps = {
  theme?: "dark" | "light";
};

const WHATSAPP_SENT_MESSAGE =
  "Un lien de connexion vous a été envoyé sur WhatsApp. Vérifiez vos messages.";

function validatePhoneClient(raw: string): boolean {
  const normalized = normalizeLoginPhone(raw);
  return isValidLoginPhoneNormalized(normalized);
}

export function LoginForm({ theme = "dark" }: LoginFormProps) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSent(false);
    setIsPending(true);

    try {
      if (!validatePhoneClient(phone)) {
        setError("Le numéro doit commencer par + et comporter entre 8 et 15 chiffres (ex. +33 6 12 34 56 78).");
        return;
      }

      const result = await sendLoginLink(phone);

      if (!result.ok) {
        setError(result.error ?? "Impossible de traiter la demande pour le moment. Réessayez plus tard.");
        return;
      }

      setSent(true);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField htmlFor="phone" label="Votre numéro WhatsApp" required>
        <Input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+33 6 12 34 56 78"
          required
          disabled={sent}
        />
      </FormField>

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      {sent ? (
        <p className={`text-sm ${theme === "light" ? "text-slate-600" : "text-slate-400"}`}>
          {WHATSAPP_SENT_MESSAGE}
        </p>
      ) : null}

      <Button type="submit" disabled={isPending || sent} variant="accent" fullWidth>
        {isPending ? "Envoi..." : sent ? "Lien envoyé" : "Recevoir le lien de connexion →"}
      </Button>

      <p className={`text-sm ${theme === "light" ? "text-slate-600" : "text-slate-400"}`}>
        Pas encore de compte ?{" "}
        <Link
          href="/chat"
          className={theme === "light" ? "text-sky-600 hover:text-sky-500" : "text-sky-400 hover:text-sky-300"}
        >
          Démarrez votre audit →
        </Link>
      </p>
    </form>
  );
}
