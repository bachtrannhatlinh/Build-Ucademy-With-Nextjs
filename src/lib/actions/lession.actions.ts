"use server";

import { TUpdateLessonParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import Lession from "@/app/database/lesson.model";
import { revalidatePath } from "next/cache";

export async function updateLesson(params: TUpdateLessonParams) {
  try {
    connectToDatabase();
    await Lession.findByIdAndUpdate(params.lessonId, params.updateData, {
      new: true,
    });
    revalidatePath(params.path || "/");
    return {
      success: true,
      message: "Lession updated successfully",
    };
  } catch (error) {
    console.error("Error updating lecture:", error);
    return null;
  }
}
