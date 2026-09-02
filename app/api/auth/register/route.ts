import { NextRequest } from "next/server";
import { handler } from "@/libs/api-handler";
import { getSessionToken, setSessionCookie } from "@/libs/session";
import { extractSub, signJwt } from "@/libs/jwt";
import { registerUser } from "@/services/user.service";
import { validateRegisterInput } from "@/validators/auth.validator";

export const POST = handler(async (req: NextRequest) => {
  const input = await validateRegisterInput(req);
  const user = await registerUser(input);

  const existingToken = await getSessionToken();
  const existingSub = existingToken
    ? await extractSub(existingToken)
    : undefined;

  if (!existingSub) {
    const token = await signJwt({ sub: user.id });
    await setSessionCookie(token);
  }

  return Response.json(user, { status: 201 });
});