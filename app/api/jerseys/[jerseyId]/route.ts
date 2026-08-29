import { NextRequest } from "next/server";
import { handler, type RouteContext } from "@/libs/api-handler";
import {
  deleteJersey,
  getJersey,
  updateJersey,
} from "@/services/jersey.service";
import { validatePatchJerseyInput } from "@/validators/jerseys.validator";

export const GET = handler(async (_req: NextRequest, ctx: RouteContext) => {
  const { jerseyId } = await ctx.params;
  const jersey = await getJersey(jerseyId);

  return Response.json(jersey, { status: 200 });
});

export const PATCH = handler(async (req: NextRequest, ctx: RouteContext) => {
  const { jerseyId } = await ctx.params;
  const patch = await validatePatchJerseyInput(req);
  const jersey = await updateJersey(jerseyId, patch);

  return Response.json(jersey, { status: 200 });
});

export const DELETE = handler(async (_req: NextRequest, ctx: RouteContext) => {
  const { jerseyId } = await ctx.params;
  await deleteJersey(jerseyId);

  return new Response(null, { status: 204 });
});