"use server";

import User, { IUser } from "@/app/database/user.model";
import { CourseStatus } from "@/constants";
import { connectToDatabase } from "@/lib/mongoose";
import { TCreateUserParams } from "@/types";

export async function createUser(params: TCreateUserParams) {
  try {
    await connectToDatabase();
    const user = await User.create(params);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    throw new Error("Database error: Unable to create user");
  }
}

export async function getUserInfo({
  userId,
}: {
  userId: string;
}): Promise<IUser | null | undefined> {
  try {
    connectToDatabase();
    const findUser = await User.findOne({ clerkId: userId }).populate({
      path: "courses",
      model: "Course",
      match: {
        status: CourseStatus.ALL,
      },
    });

    if (!findUser?._id) return null;

    return JSON.parse(JSON.stringify(findUser));
  } catch (error) {
    console.log(error);
  }
}
