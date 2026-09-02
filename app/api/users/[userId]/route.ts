import { NextRequest } from "next/server";
import { handler, type RouteContext } from "@/libs/api-handler";
import { requireSessionUser } from "@/libs/require-session";
import { deleteUser } from "@/services/user.service";

export const DELETE = handler(async (_req: NextRequest, ctx: RouteContext) => {
  await requireSessionUser();
  const { userId } = await ctx.params;
  await deleteUser(userId);

  return new Response(null, { status: 204 });
});
