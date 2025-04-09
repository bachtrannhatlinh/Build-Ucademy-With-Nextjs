"use server"

import historyModel, { IHistory } from "@/app/database/history.model";
import { connectToDatabase } from "../mongoose";
import { TCreateHistoryParams } from "@/types";
import { auth } from "@clerk/nextjs/server";
import User from "@/app/database/user.model";

export async function createHistory(params: TCreateHistoryParams) {
  try {
    connectToDatabase();
    const { userId } = await auth();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return null;

    const newHistory = await historyModel.create({
      course: params.course,
      lesson: params.lesson,
      user: findUser._id,
    });
    if (!newHistory) {
      throw new Error("History not found");
    }
    return {
      success: true,
      message: "History created successfully",
    };
  } catch (error) {
    console.error("Error creating history:", error);
    return null;
  }
}

export async function getHistory(params: {course: string}): Promise<IHistory[] | undefined> {
  try {
    connectToDatabase();
    const histories = await historyModel.find({course: params.course})
    return JSON.parse(JSON.stringify(histories));
  } catch (error) {
    console.error("Error fetching history:", error);
  }
}

export async function deleteHistory(params: {course: string}) {
  try {
    connectToDatabase();
    const histories = await historyModel.deleteMany({course: params.course})
    return histories;
  } catch (error) {
    console.error("Error fetching history:", error);
    return null;
  }
}