import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import {
  LOCALE_COOKIE,
  isLocale,
  normalizeLocale,
} from "@/libs/i18n/config";

const SESSION_COOKIE = "session";
const LOGIN_API_PATH = "/api/auth/login";
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

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
  const { pathname, search } = req.nextUrl;
  const isAdmin = pathname.startsWith("/admin");
  const isApi = pathname.startsWith("/api");
  const isLogin = pathname === "/login";

  if (isAdmin || isApi) {
    const isProtected =
      isAdmin || (isApi && req.method !== "GET" && pathname !== LOGIN_API_PATH);

    if (isProtected && !(await hasValidSession(req))) {
      const locale = normalizeLocale(req.cookies.get(LOCALE_COOKIE)?.value);
      return NextResponse.redirect(new URL(`/${locale}/home`, req.url));
    }

    return NextResponse.next();
  }

  if (isLogin) return NextResponse.next();

  const [, firstSegment] = pathname.split("/");

  if (isLocale(firstSegment)) {
    const response = NextResponse.next();

    if (req.cookies.get(LOCALE_COOKIE)?.value !== firstSegment) {
      response.cookies.set(LOCALE_COOKIE, firstSegment, {
        path: "/",
        maxAge: LOCALE_COOKIE_MAX_AGE,
        sameSite: "lax",
      });
    }

    return response;
  }

  const locale = normalizeLocale(req.cookies.get(LOCALE_COOKIE)?.value);
  const target =
    pathname === "/" ? `/${locale}/home` : `/${locale}${pathname}`;

  return NextResponse.redirect(new URL(`${target}${search}`, req.url));
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
