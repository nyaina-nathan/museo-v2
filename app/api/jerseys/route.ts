import { NextRequest } from "next/server";
import { handler } from "@/libs/api-handler";
import { createJersey, listJerseys } from "@/services/jersey.service";
import {
  validateCreateJerseyInput,
  validateListJerseyQuery,
} from "@/validators/jerseys.validator";

export const GET = handler(async (req: NextRequest) => {
  const query = validateListJerseyQuery(req);
  const result = await listJerseys(query);

  return Response.json(result, { status: 200 });
});

export const POST = handler(async (req: NextRequest) => {
  const input = await validateCreateJerseyInput(req);
  const jersey = await createJersey(input);

  return Response.json(jersey, { status: 201 });
});