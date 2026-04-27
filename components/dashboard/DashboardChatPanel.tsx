"use client";

import { useEffect, useRef, useState } from "react";
import { loadWebChatMessages, sendWebChatMessage } from "@/app/chat/actions";
import { WEB_CHAT_STARTER_MESSAGE } from "@/app/chat/web-chat-constants";
import { Button } from "@/components/atoms/Button";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

function Dots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
    </span>
  );
}

type DashboardChatPanelProps = {
  sessionEmail: string;
  /** `page` : zone messages plus haute pour la route /dashboard/chat. */
  layout?: "embedded" | "page";
};

export function DashboardChatPanel({
  sessionEmail,
  layout = "embedded",
}: DashboardChatPanelProps) {
  const chatEmail = sessionEmail.trim().toLowerCase();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [inlineError, setInlineError] = useState<string | null>(null);
  const [historyReady, setHistoryReady] = useState(false);
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
      try {
        const rows = await loadWebChatMessages(chatEmail);
        if (!cancelled) setMessages(rows);
      } catch {
        if (!cancelled) setMessages([]);
      } finally {
        if (!cancelled) setHistoryReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chatEmail]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function sendUserTurn(message: string) {
    const next = message.trim();
    if (!next || isTyping || !chatEmail) return;
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

  const messagesScrollClass =
    layout === "page"
      ? "min-h-[50vh] max-h-[min(65dvh,640px)] overflow-y-auto px-4 py-3"
      : "max-h-[min(42vh,380px)] min-h-[200px] overflow-y-auto px-4 py-3";

  if (!historyReady) {
    return (
      <div className="rounded-xl border border-stone-200 bg-white p-4">
        <p className="text-center text-sm text-slate-500">Chargement de l’entretien…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-xl border border-stone-200 bg-white shadow-sm">
      <header className="border-b border-stone-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-700 text-xs font-bold text-white">
            EX
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-slate-900">Assistant</h2>
            <p className="truncate text-xs text-slate-500">Issa · Fortyn</p>
          </div>
        </div>
      </header>

      <div className={messagesScrollClass}>
        <div className="space-y-3">
          {messages.length === 0 && !isTyping ? (
            <div className="mx-auto max-w-md space-y-3 py-2 text-center">
              <p className="text-sm text-slate-600">
                Poursuivez votre échange avec l’assistant. Si vous n’avez pas encore commencé sur le site,
                lancez la conversation ici.
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
              className={`max-w-[90%] rounded-lg border px-3 py-2.5 text-sm ${
                message.role === "assistant"
                  ? "border-stone-200 bg-stone-50 text-slate-700 border-l-4 border-l-sky-500"
                  : "ml-auto border-sky-500 bg-sky-500 text-white"
              }`}
            >
              {message.content}
            </div>
          ))}
          {isTyping ? (
            <div className="inline-flex max-w-[90%] items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-slate-500">
              Réponse en cours <Dots />
            </div>
          ) : null}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-stone-200 p-3">
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
              className="max-h-24 min-h-10 flex-1 resize-none rounded-md border border-stone-200 px-3 py-2 text-sm outline-none focus:border-sky-500 disabled:bg-stone-100"
            />
            <Button type="button" onClick={() => void handleSubmitMessage()} disabled={isTyping} size="md">
              Envoyer
            </Button>
          </div>
        ) : null}
        {inlineError ? <p className="mt-2 text-xs text-rose-600">{inlineError}</p> : null}
      </div>
    </div>
  );
}
