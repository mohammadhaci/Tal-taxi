import { SignJWT, jwtVerify } from "jose";

// Edge-sicher (kein next/headers) — auch in der Middleware nutzbar.
const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-only-change-me"
);

export type SessionPayload = {
  sub: string;
  email: string;
  role: string;
  name?: string;
};

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySession(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = "tt_session";
