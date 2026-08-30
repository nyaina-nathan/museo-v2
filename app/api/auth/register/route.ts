import { NextRequest } from "next/server";
import { handler } from "@/libs/api-handler";
import { setSessionCookie } from "@/libs/session";
import { signJwt } from "@/libs/jwt";
import { registerUser } from "@/services/user.service";
import { validateRegisterInput } from "@/validators/auth.validator";

export const POST = handler(async (req: NextRequest) => {
  const input = await validateRegisterInput(req);
  const user = await registerUser(input);
  const token = await signJwt({ sub: user.id });
  await setSessionCookie(token);

  return Response.json(user, { status: 201 });
});