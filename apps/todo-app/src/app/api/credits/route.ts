// Get the request limit of the user
import { prisma } from "@repo/db";
import { validateRequest } from "../../lib/middleware";
import { corsHeaders } from "../../lib/cors";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const validation = await validateRequest(req, true);

  if (validation.status === 401) {
    return NextResponse.json(
      {
        error: "Unauthorized or invalid user.",
      },
      {
        status: 401,
        headers: corsHeaders,
      }
    );
  }

  if (validation.status !== 200) {
    return NextResponse.json(validation.body, {
      status: validation.status,
      headers: corsHeaders,
    });
  }

  if (!validation.user) {
    return NextResponse.json(
      { error: "Unauthorized or invalid user." },
      { status: 401, headers: corsHeaders }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: validation.user!.id },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404, headers: corsHeaders }
    );
  }

  return NextResponse.json({ requestCount: user.requestCount });
}
