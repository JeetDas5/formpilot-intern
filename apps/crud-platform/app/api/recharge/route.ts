import { prisma } from "@repo/db";
import { validateRequest } from "../../../lib/middleware";
import { corsHeaders } from "../../../lib/cors";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: Request) {
  const validation = await validateRequest(req);
  // skip request count
  if (validation.status !== 200) {
    return new Response(JSON.stringify(validation.body), {
      status: validation.status,
      headers: corsHeaders,
    });
  }

  const user = validation.user!;
  if (user.hasRecharged) {
    return new Response(
      JSON.stringify({ error: "Credits exhausted. Cannot recharge again." }),
      { status: 403, headers: corsHeaders }
    );
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      requestLimit: 8,
      hasRecharged: true,
    },
  });

  return new Response(
    JSON.stringify({
      message: "Recharged successfully!",
      credits: updated.requestLimit,
    }),
    { status: 200, headers: corsHeaders }
  );
}
