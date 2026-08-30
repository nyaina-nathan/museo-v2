import { NextRequest } from "next/server";
import { handler } from "@/libs/api-handler";
import { setSessionCookie } from "@/libs/session";
import { signJwt } from "@/libs/jwt";
import { loginUser } from "@/services/user.service";
import { validateLoginInput } from "@/validators/auth.validator";

export const POST = handler(async (req: NextRequest) => {
  const input = await validateLoginInput(req);
  const user = await loginUser(input);
  const token = await signJwt({ sub: user.id });
  await setSessionCookie(token);

  return Response.json(user, { status: 200 });
});