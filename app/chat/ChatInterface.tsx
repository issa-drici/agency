"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import {
  loadWebChatMessages,
  registerChatLeadEmail,
  sendWebChatMessage,
} from "@/app/chat/actions";
import { WEB_CHAT_STARTER_MESSAGE } from "@/app/chat/web-chat-constants";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { Button } from "@/components/atoms/Button";
import { ButtonLink } from "@/components/molecules/ButtonLink";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const SESSION_EMAIL_KEY = "fortyn_web_chat_email";

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
  const [phase, setPhase] = useState<"email" | "chat">("email");
  const [emailDraft, setEmailDraft] = useState("");
  const [chatEmail, setChatEmail] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isEmailPending, setIsEmailPending] = useState(false);
  const [inlineError, setInlineError] = useState<string | null>(null);
  /** false jusqu’au premier passage client (session + éventuel chargement historique). */
  const [sessionChecked, setSessionChecked] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const composerRef = useRef<HTMLTextAreaElement | null>(null);

  function focusComposer() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        composerRef.current?.focus();
      });
    });
  }

  useEffect(() => {
    let cancelled = false;

    (async () => {
      let saved: string | null = null;
      try {
        saved = sessionStorage.getItem(SESSION_EMAIL_KEY);
      } catch {
        /* sessionStorage indisponible */
      }

      if (!saved?.includes("@")) {
        if (!cancelled) setSessionChecked(true);
        return;
      }

      setChatEmail(saved);
      setPhase("chat");
      try {
        const rows = await loadWebChatMessages(saved);
        if (!cancelled) setMessages(rows);
      } catch {
        if (!cancelled) setMessages([]);
      } finally {
        if (!cancelled) setSessionChecked(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function handleEmailGateSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = emailDraft.trim().toLowerCase();
    if (!normalized) {
      setInlineError("Veuillez saisir votre adresse email.");
      return;
    }

    setIsEmailPending(true);
    setInlineError(null);

    try {
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

      if (result?.error && result.error !== "AccessDenied") {
        setInlineError(
          "Impossible d’envoyer le lien pour le moment. Réessayez ou utilisez « Retrouver mon audit » ci-dessus.",
        );
        return;
      }

      try {
        sessionStorage.setItem(SESSION_EMAIL_KEY, normalized);
      } catch {
        /* ignore */
      }
      setChatEmail(normalized);
      setPhase("chat");
      try {
        const rows = await loadWebChatMessages(normalized);
        setMessages(rows);
      } catch {
        setMessages([]);
      }
    } catch {
      setInlineError("Une erreur est survenue. Réessayez.");
    } finally {
      setIsEmailPending(false);
    }
  }

  async function sendUserTurn(message: string) {
    const next = message.trim();
    if (!next || isTyping || phase !== "chat" || !chatEmail) return;
    setInlineError(null);
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: next },
    ]);
    setIsTyping(true);

    try {
      const { reply } = await sendWebChatMessage({
        email: chatEmail,
        message: next,
      });
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: reply },
      ]);
    } catch {
      setInlineError("Une erreur est survenue. Veuillez réessayer.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsTyping(false);
      focusComposer();
    }
  }

  function handleStartChat() {
    void sendUserTurn(WEB_CHAT_STARTER_MESSAGE);
  }

  async function handleSubmitMessage() {
    const next = text.trim();
    if (!next) return;
    setText("");
    await sendUserTurn(next);
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
          {!sessionChecked ? (
            <p className="py-16 text-center text-sm text-slate-500">Chargement…</p>
          ) : phase === "email" ? (
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h1 className="text-lg font-semibold text-slate-900">Avant de commencer</h1>
              <p className="mt-2 text-sm text-slate-600">
                Indiquez votre adresse email professionnelle. Nous vous enverrons un lien pour créer
                votre accès et vous connecter, puis vous pourrez échanger avec notre assistant.
              </p>
              <form onSubmit={(e) => void handleEmailGateSubmit(e)} className="mt-5 space-y-3">
                <input
                  type="email"
                  value={emailDraft}
                  onChange={(event) => setEmailDraft(event.target.value)}
                  placeholder="vous@entreprise.fr"
                  autoComplete="email"
                  required
                  className="h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-sky-500"
                />
                <Button type="submit" disabled={isEmailPending} size="md" className="w-full sm:w-auto">
                  {isEmailPending ? "Envoi du lien…" : "Recevoir le lien et commencer l’entretien →"}
                </Button>
              </form>
              {inlineError ? <p className="mt-3 text-sm text-rose-600">{inlineError}</p> : null}
              <p className="mt-4 text-xs text-slate-500">
                Pensez à vérifier vos courriers indésirables. Le lien expire après un délai limité.
              </p>
            </section>
          ) : (
            <section>
              <header className="rounded-t-xl border border-slate-200 bg-white px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-700 text-xs font-bold text-white">
                    EX
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      Issa de Fortyn
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-700">
                        En ligne
                      </span>
                    </div>
                    <p className="truncate text-xs text-slate-500">
                      Entretien de cadrage · {chatEmail}
                    </p>
                  </div>
                </div>
              </header>

              <div className="h-[66vh] overflow-y-auto border-x border-slate-200 bg-white px-4 py-4">
                <div className="space-y-3">
                  {messages.length === 0 && !isTyping ? (
                    <div className="mx-auto max-w-md space-y-4 py-6 text-center">
                      <p className="text-sm text-slate-600">
                        Un lien de connexion vient d’être envoyé à <strong>{chatEmail}</strong>.
                        Quand vous êtes prêt, lancez l’échange : l’assistant vous posera la première
                        question.
                      </p>
                      <Button
                        type="button"
                        onClick={handleStartChat}
                        disabled={isTyping}
                        size="md"
                        className="w-full sm:w-auto"
                      >
                        Démarrer le chat
                      </Button>
                    </div>
                  ) : null}
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

                  {isTyping && (
                    <div className="inline-flex max-w-[85%] items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                      Réponse en cours <Dots />
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="sticky bottom-0 rounded-b-xl border border-slate-200 bg-white p-3">
                {messages.length > 0 ? (
                  <div className="flex items-end gap-2">
                    <textarea
                      ref={composerRef}
                      value={text}
                      onChange={(event) => setText(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          void handleSubmitMessage();
                        }
                      }}
                      rows={1}
                      placeholder="Votre message…"
                      disabled={isTyping}
                      className="max-h-24 min-h-11 flex-1 resize-none rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-500 disabled:bg-slate-100"
                    />
                    <Button
                      type="button"
                      onClick={() => void handleSubmitMessage()}
                      disabled={isTyping}
                      size="md"
                    >
                      Envoyer
                    </Button>
                  </div>
                ) : null}
                {inlineError ? <p className="mt-2 text-xs text-rose-500">{inlineError}</p> : null}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
