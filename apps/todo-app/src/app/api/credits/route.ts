// Get the request count of the user
import { prisma } from "@repo/db";
import { validateRequest } from "../../lib/middleware";
import { corsHeaders } from "@/app/lib/cors";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const validation = await validateRequest(req, true);

  if (validation.status !== 200 && validation.status !== 430) {
    return NextResponse.json(validation.body, {
      status: validation.status,
      headers: corsHeaders,
    });
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
