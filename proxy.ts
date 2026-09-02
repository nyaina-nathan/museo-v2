import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "session";
const LOGIN_API_PATH = "/api/auth/login";

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET environment variable is not set");
  return new TextEncoder().encode(secret);
}

async function hasValidSession(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAdmin = pathname.startsWith("/admin");
  const isApi = pathname.startsWith("/api");

  if (!isAdmin && !isApi) return NextResponse.next();

  const isProtected =
    isAdmin || (isApi && req.method !== "GET" && pathname !== LOGIN_API_PATH);

  if (!isProtected) return NextResponse.next();
  if (await hasValidSession(req)) return NextResponse.next();

  return NextResponse.redirect(new URL("/home", req.url));
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
