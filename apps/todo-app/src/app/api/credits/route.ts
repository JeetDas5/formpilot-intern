// apps/todo-app/app/api/credits/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email || typeof email !== "string") {
    return NextResponse.json({ message: "Email is required." }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const remaining = user.requestLimit - user.requestCount;

    return NextResponse.json({ remaining }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching credits.",error }, { status: 500 });
  }
}
