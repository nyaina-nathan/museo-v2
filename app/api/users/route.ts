import { handler } from "@/libs/api-handler";
import { requireSessionUser } from "@/libs/require-session";
import { listUsers } from "@/services/user.service";

export const GET = handler(async () => {
  await requireSessionUser();
  const users = await listUsers();

  return Response.json(users, { status: 200 });
});
