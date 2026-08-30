import "dotenv/config";
import { jwtVerify, SignJWT } from "jose";
import type { JWTPayload } from "jose";

export interface JwtClaims extends JWTPayload {
  sub: string;
}

function getSecret(): Uint8Array {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  return new TextEncoder().encode(process.env.JWT_SECRET);
}

export async function signJwt(
  payload: JwtClaims,
  expiresIn: string | number = "7d"
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getSecret());
}

export async function verifyJwt<T extends JwtClaims = JwtClaims>(
  token: string
): Promise<T> {
  const { payload } = await jwtVerify(token, getSecret());
  return payload as T;
}

export async function extractSub(token: string): Promise<string | undefined> {
  try {
    const payload = await verifyJwt(token);
    return payload.sub;
  } catch {
    return undefined;
  }
}