import { handler } from "@/libs/api-handler";
import { ApiError } from "@/libs/api-error";
import { deleteSessionCookie, getSessionToken } from "@/libs/session";
import { extractSub } from "@/libs/jwt";

export const POST = handler(async () => {
  const token = await getSessionToken();

  if (!token || !(await extractSub(token))) {
    throw new ApiError({
      title: "Unauthorized",
      message: "Missing or invalid session",
      status: 401,
    });
  }

  await deleteSessionCookie();

  return new Response(null, { status: 204 });
});