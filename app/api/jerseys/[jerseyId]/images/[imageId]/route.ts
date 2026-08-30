import { NextRequest } from "next/server";
import { handler, type RouteContext } from "@/libs/api-handler";
import {
  deleteJerseyImage,
  getJerseyImage,
} from "@/services/jersey.service";

export const GET = handler(async (_req: NextRequest, ctx: RouteContext) => {
  const { jerseyId, imageId } = await ctx.params;
  const image = await getJerseyImage(jerseyId, imageId);

  return Response.json(image, { status: 200 });
});

export const DELETE = handler(async (_req: NextRequest, ctx: RouteContext) => {
  const { jerseyId, imageId } = await ctx.params;
  await deleteJerseyImage(jerseyId, imageId);

  return new Response(null, { status: 204 });
});