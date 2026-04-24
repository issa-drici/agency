"use client";

import Link from "next/link";
import { type SyntheticEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";

const NEUTRAL_SENT_MESSAGE =
  "Si un compte est associé à cette adresse, vous recevrez sous peu un message contenant un lien. Pensez à vérifier vos courriers indésirables.";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
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

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      {sent ? (
        <div className="space-y-3 text-sm text-slate-400">
          <p>{NEUTRAL_SENT_MESSAGE}</p>
          {linkIssued && process.env.NODE_ENV === "development" ? (
            <p className="rounded-md border border-white/10 bg-white/5 p-3 text-xs text-slate-400">
              <strong className="font-medium text-slate-300">Mode développement :</strong> sans Resend, le
              lien peut s’afficher dans le terminal du serveur (<code className="rounded bg-black/30 px-1">pnpm dev</code>
              ).
            </p>
          ) : null}
        </div>
      ) : null}

      <Button type="submit" disabled={isPending || sent} fullWidth>
        {isPending ? "Envoi..." : sent ? "Lien envoyé" : "Recevoir le lien d’inscription →"}
      </Button>

      <p className="text-sm text-slate-400">
        <Link href="/login" className="text-sky-400 hover:text-sky-300">
          Déjà un compte ? Connexion →
        </Link>
      </p>
    </form>
  );
}
