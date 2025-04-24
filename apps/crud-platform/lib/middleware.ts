import { prisma } from "@repo/db";

export async function validateRequest(req: Request) {
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey) {
    return { status: 401, body: { error: "API key missing" } };
  }

  const user = await prisma.user.findFirst({ where: { apiKey } });
  if (!user) return { status: 403, body: { error: "Invalid User" } };

  return { status: 200, user };
}
