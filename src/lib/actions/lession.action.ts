"use server"

import { TCreateLessionParams } from "@/types"
import { connectToDatabase } from "../mongoose";
import courseModel from "@/app/database/course.model";
import lectureModel from "@/app/database/lecture.model";
import lessonModel, { ILesson } from "@/app/database/lesson.model";
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

export async function getLessonBySlug(course: string, slug: string): Promise<ILesson | undefined> {
  try {
    connectToDatabase();
    const lesson = await lessonModel.findOne({ course, slug });
    if (!lesson) {
      throw new Error("Lesson not found");
    }
    return JSON.parse(JSON.stringify(lesson));
  } catch (error) {
    console.error("Error getting lesson by slug:", error);
    return undefined;
  }
}

export async function getAllLessonByCourse(course: string): Promise<ILesson[]> {
  try {
    connectToDatabase();
    const lessons = await lessonModel.find({ course });
    if (!lessons) {
      throw new Error("Lessons not found");
    }
    return lessons;
  } catch (error) {
    console.error("Error getting all lessons by course:", error);
    return [];
  }
}
