import { prisma } from "@repo/db";
import { validateRequest } from "../../lib/middleware";
import { NextResponse } from "next/server";
import { corsHeaders } from "@/app/lib/cors";

export async function GET(req: Request) {
  const validation = await validateRequest(req, true);

  if (validation.status !== 200 && validation.status !== 430) {
    return NextResponse.json(validation.body, { status: validation.status,headers: corsHeaders });
  }

  const data = await prisma.data.findMany({
    where: { userId: validation.user!.id },
    orderBy: { createdAt: "desc" },
  });

  

  return NextResponse.json(data);
}
