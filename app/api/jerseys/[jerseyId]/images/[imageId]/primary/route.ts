import { NextRequest } from "next/server";
import { handler, type RouteContext } from "@/libs/api-handler";
import { setPrimaryJerseyImage } from "@/services/jersey.service";

export const PATCH = handler(async (_req: NextRequest, ctx: RouteContext) => {
  const { jerseyId, imageId } = await ctx.params;
  const image = await setPrimaryJerseyImage(jerseyId, imageId);

  return Response.json(image, { status: 200 });
});
