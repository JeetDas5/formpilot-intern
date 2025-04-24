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

  // If user is fetching but request count reched limit, return the data with success
  if (isFetching && user.requestCount >= user.requestLimit) {
    return { status: 200, user };
  }

  // If user is fetching and request count is not reached, return the data with success
  if (isFetching && user.requestCount < user.requestLimit) {
    return { status: 200, user };
  }
  // If user is not fetching and request count is not reached, return the data with success
  if (!isFetching && user.requestCount < user.requestLimit) {
    await prisma.user.update({
      where: { id: user.id },
      data: { requestCount: user.requestCount + 1 },
    });
    return { status: 200, user };
  }

  // If user is not fetching and request count is reached, return the data with error
  if (!isFetching && user.requestCount == user.requestLimit) {
    return { status: 429, body: { error: "Request limit reached" } };
  }

  return { status: 200, user };
}
