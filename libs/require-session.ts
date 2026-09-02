import { getSessionToken } from "@/libs/session";
import { extractSub } from "@/libs/jwt";
import { ApiError } from "@/libs/api-error";
import { getUserById } from "@/services/user.service";
import type { User } from "@/types/user.types";

export async function requireSessionUser(): Promise<User> {
  const token = await getSessionToken();

  if (!token) {
    throw new ApiError({
      title: "Unauthorized",
      message: "Missing session cookie",
      status: 401,
    });
  }

  const sub = await extractSub(token);

  if (!sub) {
    throw new ApiError({
      title: "Unauthorized",
      message: "Invalid session",
      status: 401,
    });
  }

  return getUserById(sub);
}
