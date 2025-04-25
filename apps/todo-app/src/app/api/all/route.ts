import { prisma } from "@repo/db";
import { validateRequest } from "../../lib/middleware";
import { NextResponse } from "next/server";
import { corsHeaders } from "../../lib/cors";

export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(req: Request) {
  const validation = await validateRequest(req, true);

  if (validation.status === 429) {
    return NextResponse.json(
      { error: "Request limit reached" },
      { status: 429, headers: corsHeaders }
    );
  }

  if (validation.status !== 200) {
    return NextResponse.json(validation.body, { status: validation.status,headers: corsHeaders });
  }

  if (!validation.user) {
    return NextResponse.json(
      { error: "Unauthorized or invalid user." },
      { status: 401, headers: corsHeaders }
    );
  }
  

  const data = await prisma.data.findMany({
    where: { userId: validation.user!.id },
    orderBy: { createdAt: "desc" },
  });

  

  return NextResponse.json(data,{ status: 200, headers: corsHeaders });
}
