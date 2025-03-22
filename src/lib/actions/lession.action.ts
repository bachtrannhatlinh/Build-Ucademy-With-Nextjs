"use server"

import { TCreateLessionParams } from "@/types"
import { connectToDatabase } from "../mongoose";
import courseModel from "@/app/database/course.model";
import lectureModel from "@/app/database/lecture.model";
import lessonModel from "@/app/database/lesson.model";
import { revalidatePath } from "next/cache";

export async function createLession(params: TCreateLessionParams) {
  try {
    connectToDatabase();
    const findSource = await courseModel.findById(params.course);
    if (!findSource) {
      throw new Error("Course not found");
    }
    const findLecture = await lectureModel.findById(params.lecture);
    if (!findLecture) {
      throw new Error("Lecture not found");
    }
    const newLession = await lessonModel.create(params);
    findLecture.lessons.push(newLession._id);
    await findLecture.save();
    revalidatePath(params.path || "/");
    if(!newLession) {
      throw new Error("Lession not found")
    }
    return {
      success: true,
      message: "Lession created successfully",
    };
  } catch (error) {
    console.error("Error creating lession:", error);
    return null;
  }
}
