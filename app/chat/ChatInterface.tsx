"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { registerChatLeadEmail, sendMessage } from "@/app/chat/actions";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { Button } from "@/components/atoms/Button";
import { ButtonLink } from "@/components/molecules/ButtonLink";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const INITIAL_QUESTION =
  "Bonjour. Quel est le principal problème qui vous fait perdre du temps aujourd'hui ?";

function Dots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
    </span>
  );
}

export function ChatInterface() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { id: crypto.randomUUID(), role: "assistant", content: INITIAL_QUESTION },
  ]);
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSavingEmail, setIsSavingEmail] = useState(false);
  const [inlineError, setInlineError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const showEmailStep = questionIndex === 2;
  const disableComposer = isTyping || showEmailStep;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function askNextQuestion(userMessage: string) {
    setInlineError(null);
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: userMessage },
    ]);
    setIsTyping(true);

    try {
      const response = await sendMessage({
        message: userMessage,
        questionIndex,
      });

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: "assistant", content: response.reply },
        ]);
        setQuestionIndex((prev) => prev + 1);
        setIsTyping(false);
      }, 500);
    } catch {
      setInlineError("Une erreur est survenue. Veuillez réessayer.");
      setIsTyping(false);
    }
  }

  async function handleSubmitMessage() {
    const next = text.trim();
    if (!next || disableComposer) return;
    setText("");
    await askNextQuestion(next);
  }

  async function handleSaveEmail() {
    if (!email.trim()) {
      setInlineError("Veuillez saisir un email valide.");
      return;
    }

    setIsSavingEmail(true);
    setInlineError(null);

    try {
      const normalized = email.trim().toLowerCase();
      const registered = await registerChatLeadEmail(normalized);
      if (!registered.ok) {
        setInlineError(
          registered.code === "INVALID"
            ? "Adresse email invalide."
            : "Enregistrement impossible pour le moment. Réessayez.",
        );
        return;
      }

      const result = await signIn("email", {
        email: normalized,
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (result?.error) {
        if (result.error === "AccessDenied") {
          setInlineError(null);
          await askNextQuestion(`Email partagé: ${normalized}`);
          return;
        }
        setInlineError(
          "Impossible d’envoyer le lien pour le moment. Réessayez ou utilisez « Retrouver mon audit » ci-dessus.",
        );
        return;
      }

      await askNextQuestion(`Email partagé: ${normalized}`);
    } catch {
      setInlineError("Une erreur est survenue. Réessayez.");
    } finally {
      setIsSavingEmail(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fafaf9]">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 py-6">
        <nav className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center" aria-label="Fortyn — accueil">
            <BrandLogo size="md" />
          </Link>
          <ButtonLink href="/dashboard" variant="textMuted" size="sm" className="px-0">
            Retrouver mon audit →
          </ButtonLink>
        </nav>

        <div className="mx-auto w-full max-w-3xl">
          <section>
            <header className="rounded-t-xl border border-slate-200 bg-white px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-700 text-xs font-bold text-white">
                  EX
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    Issa de Fortyn
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-700">
                      En ligne
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Entretien de cadrage</p>
                </div>
              </div>
            </header>

            <div className="h-[66vh] overflow-y-auto border-x border-slate-200 bg-white px-4 py-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`max-w-[85%] rounded-lg border px-4 py-3 text-sm animate-[fadeIn_220ms_ease-out] ${
                      message.role === "assistant"
                        ? "border-slate-200 bg-slate-50 text-slate-700 border-l-4 border-l-sky-500"
                        : "ml-auto border-sky-500 bg-sky-500 text-white"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}

                {showEmailStep && (
                  <div className="max-w-[85%] rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
                    <p className="mb-3">
                      Pour créer votre accès et sauvegarder la progression, indiquez votre email professionnel.
                      En développement, le <strong>lien de connexion</strong> s’affiche dans le{" "}
                      <strong>terminal où tourne</strong> <code className="rounded bg-slate-100 px-1">pnpm dev</code>{" "}
                      (pas encore d’email réel tant que Resend n’est pas configuré).
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="vous@entreprise.fr"
                        className="h-10 flex-1 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-sky-500"
                      />
                      <Button
                        type="button"
                        onClick={() => void handleSaveEmail()}
                        disabled={isSavingEmail || isTyping}
                        size="sm"
                      >
                        {isSavingEmail ? "Envoi..." : "Valider et recevoir le lien →"}
                      </Button>
                    </div>
                  </div>
                )}

                {isTyping && (
                  <div className="inline-flex max-w-[85%] items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                    Réponse en cours <Dots />
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="sticky bottom-0 rounded-b-xl border border-slate-200 bg-white p-3">
              <div className="flex items-end gap-2">
                <textarea
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void handleSubmitMessage();
                    }
                  }}
                  rows={1}
                  placeholder="Votre réponse…"
                  disabled={disableComposer}
                  className="max-h-24 min-h-11 flex-1 resize-none rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500 disabled:bg-slate-100"
                />
                <Button
                  type="button"
                  onClick={() => void handleSubmitMessage()}
                  disabled={disableComposer}
                  size="md"
                >
                  Envoyer
                </Button>
              </div>
              {inlineError ? <p className="mt-2 text-xs text-rose-500">{inlineError}</p> : null}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
