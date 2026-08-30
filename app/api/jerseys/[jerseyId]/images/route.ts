import { NextRequest } from "next/server";
import { handler, type RouteContext } from "@/libs/api-handler";
import {
  createJerseyImage,
  listJerseyImages,
} from "@/services/jersey.service";
import { validateCreateJerseyImageInput } from "@/validators/jerseys.validator";

export const GET = handler(async (_req: NextRequest, ctx: RouteContext) => {
  const { jerseyId } = await ctx.params;
  const images = await listJerseyImages(jerseyId);

  return Response.json(images, { status: 200 });
});

export const POST = handler(async (req: NextRequest, ctx: RouteContext) => {
  const { jerseyId } = await ctx.params;
  const input = await validateCreateJerseyImageInput(req);
  const image = await createJerseyImage(jerseyId, input);

  return Response.json(image, { status: 201 });
});