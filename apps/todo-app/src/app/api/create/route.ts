import { prisma } from "@repo/db";
import { validateRequest } from "../../lib/middleware";
import { corsHeaders } from "@/app/lib/cors";
import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: Request) {
  const validation = await validateRequest(req);
  if (validation.status === 429) {
    return NextResponse.json(
      { error: "Request limit reached" },
      { status: 429, headers: corsHeaders }
    );
  }
  
  if (validation.status !== 200) {
    return NextResponse.json(validation.body, {
      status: validation.status,
      headers: corsHeaders,
    });
  }

  const { value, txHash } = await req.json();
  if (!value || !txHash) {
    return NextResponse.json(
      { error: "Missing value or txHash" },
      { status: 400, headers: corsHeaders }
    );
  }

  const data = await prisma.data.create({
    data: {
      userId: validation.user!.id,
      value,
      txHash,
    },
  });

  return NextResponse.json(
    {
      status: "created successfully",
      id: data.id,
    },
    { status: 200, headers: corsHeaders }
  );
}
