import { handler } from "@/libs/api-handler";
import { ApiError } from "@/libs/api-error";
import { getSessionToken } from "@/libs/session";
import { extractSub } from "@/libs/jwt";
import { getUserById } from "@/services/user.service";

export const GET = handler(async () => {
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

  const user = await getUserById(sub);

  return Response.json(user, { status: 200 });
});