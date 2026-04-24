function getAppBaseUrl(): string {
  const explicit =
    process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
    process.env.APP_BASE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

/**
 * Lien magique NextAuth (Resend si `RESEND_API_KEY` + `EMAIL_FROM`),
 * sinon en dev : URL loguée en console.
 */
export async function sendMagicLinkEmail(to: string, signInUrl: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const host = (() => {
    try {
      return new URL(signInUrl).host;
    } catch {
      return getAppBaseUrl().replace(/^https?:\/\//, "");
    }
  })();

  if (apiKey && from) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Connexion à ${host}`,
        html: `
          <p>Bonjour,</p>
          <p>Cliquez sur le lien ci-dessous pour vous connecter (lien à usage unique, valide peu de temps) :</p>
          <p><a href="${signInUrl}">${signInUrl}</a></p>
          <p>Si vous n’avez pas demandé cet email, ignorez-le.</p>
        `.trim(),
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Resend: ${response.status} ${body}`);
    }
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.info(
      "\n--- Lien magique (pas de Resend : ouvrez ce lien dans le navigateur) ---\n",
      signInUrl,
      "\n------------------------------------------------------------------------\n",
    );
    return;
  }

  throw new Error(
    "Envoi impossible : définissez RESEND_API_KEY et EMAIL_FROM (expéditeur vérifié chez Resend).",
  );
}
