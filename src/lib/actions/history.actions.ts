"use server";

import historyModel, { IHistory } from "@/app/database/history.model";
import { connectToDatabase } from "../mongoose";
import { TCreateHistoryParams } from "@/types";
import { auth } from "@clerk/nextjs/server";
import User from "@/app/database/user.model";
import { revalidatePath } from "next/cache";

export async function createHistory(params: TCreateHistoryParams) {
  try {
    connectToDatabase();
    const { userId } = await auth();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return null;

    if (params.checked) {
      const newHistory = await historyModel.create({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
      if (!newHistory) {
        throw new Error("History not found");
      }
      revalidatePath(params.path || "/");
      return {
        success: true,
        message: "History created successfully",
      };
    } else {
      connectToDatabase();
      const { userId } = await auth();
      const findUser = await User.findOne({ clerkId: userId });
      console.log(params, 'params')
      if (!findUser) return null;

      const deleteHistory = await historyModel.findOneAndDelete({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
      if (!deleteHistory) {
        throw new Error("History not found");
      }
      revalidatePath(params.path || "/");
      return {
        success: true,
        message: "History deleted successfully",
      };
    }
  } catch (error) {
    console.error("Error creating history:", error);
    return null;
  }
}

export async function getHistory(params: {
  course: string;
}): Promise<IHistory[] | undefined> {
  try {
    connectToDatabase();
    const histories = await historyModel.find({ course: params.course });
    return JSON.parse(JSON.stringify(histories));
  } catch (error) {
    console.error("Error fetching history:", error);
  }
}

