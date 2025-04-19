// app/api/data/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db";

// Fetching the API URL and key from environment variables
const CRUD_API_URL = process.env.NEXT_PUBLIC_CRUD_API_URL;
const CRUD_API_KEY = process.env.NEXT_PUBLIC_CRUD_API_KEY;

if (!CRUD_API_URL || !CRUD_API_KEY) {
  throw new Error("API URL or API Key is missing from environment variables.");
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const apiKey = searchParams.get("apiKey");

    if (!apiKey) {
      return new NextResponse(JSON.stringify({ error: "API Key is required" }), { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { apiKey },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Check if user has enough credits
    if (user.requestCount >= user.requestLimit) {
      return new NextResponse(
        JSON.stringify({ error: "Request limit exceeded. Please recharge credits." }),
        { status: 400 }
      );
    }

    const data = await prisma.data.findMany({
      where: { userId: user.id },
    });

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching credits.",error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { apiKey, value, txHash } = await req.json();

    if (!apiKey || !value || !txHash) {
      return new NextResponse(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { apiKey },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Check if user has enough credits
    if (user.requestCount >= user.requestLimit) {
      return new NextResponse(
        JSON.stringify({ error: "Request limit exceeded. Please recharge credits." }),
        { status: 400 }
      );
    }

    // Create new data for the user
    const newData = await prisma.data.create({
      data: {
        userId: user.id,
        value,
        txHash,
      },
    });

    // Increment user request count
    await prisma.user.update({
      where: { id: user.id },
      data: { requestCount: user.requestCount + 1 },
    });

    return new Response(
      JSON.stringify({ id: newData.id, status: "created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error creating data" }), { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { apiKey, id, value } = await req.json();

    if (!apiKey || !id || !value) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { apiKey },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Update data
    const updatedData = await prisma.data.update({
      where: { id },
      data: { value },
    });

    return new Response(JSON.stringify(updatedData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error updating data" }), { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { apiKey, id } = await req.json();

    if (!apiKey || !id) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { apiKey },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Delete data
    await prisma.data.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ message: "Data deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error deleting data" }), { status: 500 });
  }
}
