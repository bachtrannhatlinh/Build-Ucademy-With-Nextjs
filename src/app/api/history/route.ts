import { NextResponse } from "next/server";
import { createHistory } from "@/lib/actions/history.actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await createHistory(body);
    
    if (!result) {
      return NextResponse.json(
        { error: "Failed to create history" },
        { status: 500 }
      );
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in history API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 