import { handler } from "@/libs/api-handler";
import { getJerseyPriceRange } from "@/services/jersey.service";

export const GET = handler(async () => {
  const range = await getJerseyPriceRange();
  return Response.json(range, { status: 200 });
});
