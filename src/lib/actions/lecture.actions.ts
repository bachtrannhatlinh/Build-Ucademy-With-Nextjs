"use server"

import { TCreateLectureParams, TUpdateLectureParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import courseModel from "@/app/database/course.model";
import Lecture from "@/app/database/lecture.model";
import { revalidatePath } from "next/cache";

export async function createLecture(params: TCreateLectureParams) {
  try {
    connectToDatabase();
    const findCourse = await courseModel.findById(params.course);
    if (!findCourse) {
      throw new Error("Course not found");
    }
    const newLecture = await Lecture.create(params);
    findCourse.lectures.push(newLecture._id);
    revalidatePath(params.path || "/");
    findCourse.save();
    return {
      success: true,
      message: "Lecture created successfully",
    };
  } catch (error) {
    console.error("Error creating lecture:", error);
    return null;
  }
}

export async function updateLecture(params: TUpdateLectureParams) {
  try {
    connectToDatabase();
    await Lecture.findByIdAndUpdate(params.lectureId, params.updateData, {
      new: true,
    });
    revalidatePath(params.updateData.path || "/");
    return {
      success: true,
      message: "Lecture updated successfully",
    };
  } catch (error) {
    console.error("Error updating lecture:", error);
    return null;
  }
}
