/** E.164 : + suivi de 8 à 15 chiffres au total (chiffre pays 1–9 puis 7–14 chiffres). */
export const LOGIN_PHONE_E164 = /^\+[1-9]\d{7,14}$/;

/**
 * Espaces / tirets retirés ; `0…` sans `+` → `+33…` ; `+…` conservé.
 */
export function normalizeLoginPhone(raw: string): string {
  const s = raw.trim().replace(/[\s-]/g, "");
  if (s.startsWith("+")) return s;
  if (s.startsWith("0")) return `+33${s.slice(1)}`;
  return s;
}

export function isValidLoginPhoneNormalized(normalized: string): boolean {
  return LOGIN_PHONE_E164.test(normalized);
}
