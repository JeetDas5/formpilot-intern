import { prisma } from "@repo/db";
import { validateRequest } from "../../lib/middleware";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const validation = await validateRequest(req);
  if (validation.status !== 200) {
    return NextResponse.json(validation.body, { status: validation.status });
  }

  const { value, txHash } = await req.json();
  if (!value || !txHash) {
    return NextResponse.json(
      { error: "Missing value or txHash" },
      { status: 400 }
    );
  }

  const data = await prisma.data.create({
    data: {
      userId: validation.user!.id,
      value,
      txHash,
    },
  });

  return NextResponse.json({
    status: "created successfully",
    id: data.id,
  });
}
