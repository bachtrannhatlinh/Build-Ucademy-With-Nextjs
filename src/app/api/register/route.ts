import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import UserModel from "@/app/database/user.model";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { clerkId, email, username } = await req.json();

    const existingUser = await UserModel.findOne({ clerkId });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const newUser = new UserModel({ clerkId, email, username });
    await newUser.save();

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error saving user", error }, { status: 500 });
  }
}
