import { prisma } from "@repo/db";

export async function validateRequest(
  req: Request,
  isFetching: boolean = false
) {
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey) {
    return { status: 401, body: { error: "API key missing" } };
  }

  const user = await prisma.user.findFirst({ where: { apiKey } });
  if (!user) return { status: 403, body: { error: "Invalid User" } };

  if (user.requestCount >= user.requestLimit && isFetching) {
    return {
      status: 430,
      body: { message: "Request limit exceeded. Please recharge credits." },
    };
  }

  if (user.requestCount >= user.requestLimit && !isFetching) {
    return {
      status: 429,
      body: { error: "Request limit exceeded. Please recharge credits." },
    };
  }

  // If isFetching is true, we don't want to increment the request count
  if (!isFetching) {
    await prisma.user.update({
      where: { id: user.id },
      data: { requestCount: user.requestCount + 1 },  
    });
  }

  return { status: 200, user };
}
