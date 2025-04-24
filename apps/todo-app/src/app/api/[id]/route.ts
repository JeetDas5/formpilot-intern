import { prisma } from "@repo/db";
import { validateRequest } from "../../lib/middleware";
import { NextResponse } from "next/server";
import { corsHeaders } from "../../lib/cors";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const validation = await validateRequest(req);
  if (validation.status === 429) {
    return NextResponse.json(
      { error: "Request limit reached" },
      { status: 429, headers: corsHeaders }
    );
  }
  if (validation.status !== 200)
    return NextResponse.json(validation.body, {
      status: validation.status,
      headers: corsHeaders,
    });

  const data = await prisma.data.findUnique({
    where: { id: params.id, userId: validation.user!.id },
  });

  if (!data)
    return NextResponse.json({ error: "Data not found" }, { status: 404 });

  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const validation = await validateRequest(req);
  if (validation.status === 429) {
    return NextResponse.json(
      { error: "Request limit reached" },
      { status: 429, headers: corsHeaders }
    );
  }
  if (validation.status !== 200)
    return NextResponse.json(validation.body, { status: validation.status });

  const { value } = await req.json();
  if (!value)
    return NextResponse.json({ error: "Value required" }, { status: 400 });


  await prisma.data.update({
    where: { id: params.id, userId: validation.user!.id },
    data: { value },
  });

  return NextResponse.json({ status: "updated successfully" });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const validation = await validateRequest(req);
  if (validation.status === 429) {
    return NextResponse.json(
      { error: "Request limit reached" },
      { status: 429, headers: corsHeaders }
    );
  }
  if (validation.status !== 200)
    return NextResponse.json(validation.body, { status: validation.status });

  await prisma.data.delete({
    where: { id: params.id, userId: validation.user!.id },
  });

  return NextResponse.json({ status: "deleted successfully" });
}
