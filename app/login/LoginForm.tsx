"use client";

import Link from "next/link";
import { type SyntheticEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";

type LoginFormProps = {
  theme?: "dark" | "light";
};

const NEUTRAL_SENT_MESSAGE =
  "Si un compte est associé à cette adresse, vous recevrez sous peu un message contenant un lien de connexion. Pensez à vérifier vos courriers indésirables.";

export function LoginForm({ theme = "dark" }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  /** Indique qu’un lien a réellement été généré (pour l’indication dev sans fuiter l’absence de compte). */
  const [linkIssued, setLinkIssued] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSent(false);
    setLinkIssued(false);
    setIsPending(true);

    try {
      const result = await signIn("email", {
        email: email.trim().toLowerCase(),
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (result?.error) {
        if (result.error === "AccessDenied") {
          setLinkIssued(false);
          setSent(true);
          return;
        }
        setError("Impossible de traiter la demande pour le moment. Réessayez plus tard.");
        return;
      }

      setLinkIssued(true);
      setSent(true);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField htmlFor="email" label="Adresse email" required>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="vous@entreprise.fr"
          required
          disabled={sent}
        />
      </FormField>

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      {sent ? (
        <div className={`space-y-3 text-sm ${theme === "light" ? "text-slate-600" : "text-slate-400"}`}>
          <p>{NEUTRAL_SENT_MESSAGE}</p>
          {linkIssued && process.env.NODE_ENV === "development" ? (
            <p className="rounded-md border border-stone-200 bg-stone-50 p-3 text-xs text-slate-600">
              <strong className="font-medium text-slate-800">Mode développement :</strong> sans Resend, le
              lien peut aussi s’afficher dans le terminal où tourne{" "}
              <code className="rounded bg-white px-1 text-stone-800">pnpm dev</code>.
            </p>
          ) : null}
        </div>
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
