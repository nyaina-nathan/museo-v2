import { NextRequest } from "next/server";
import { handler, type RouteContext } from "@/libs/api-handler";
import {
  deleteJerseyImage,
  getJerseyImage,
  updateJerseyImage,
} from "@/services/jersey.service";
import { validatePatchJerseyImageInput } from "@/validators/jerseys.validator";

export const GET = handler(async (_req: NextRequest, ctx: RouteContext) => {
  const { jerseyId, imageId } = await ctx.params;
  const image = await getJerseyImage(jerseyId, imageId);

  return Response.json(image, { status: 200 });
});

export const PATCH = handler(async (req: NextRequest, ctx: RouteContext) => {
  const { jerseyId, imageId } = await ctx.params;
  const input = await validatePatchJerseyImageInput(req);
  const image = await updateJerseyImage(jerseyId, imageId, input);

  return Response.json(image, { status: 200 });
});

export const DELETE = handler(async (_req: NextRequest, ctx: RouteContext) => {
  const { jerseyId, imageId } = await ctx.params;
  await deleteJerseyImage(jerseyId, imageId);

  return new Response(null, { status: 204 });
});