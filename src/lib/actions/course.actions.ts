"use server";

import { TCourseUpdateParams, TCreateCourseParams, TUpdateCourseParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import Course, { ICourse } from "@/app/database/course.model";
import { revalidatePath } from "next/cache";
import lectureModel from "@/app/database/lecture.model";
import lessonModel from "@/app/database/lesson.model";

// fetching
export async function getAllCourses(): Promise<ICourse[] | undefined> {
  try {
    connectToDatabase();
    const courses = await Course.find();
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCourseBySlug({
  slug,
}: {
  slug: string;
}): Promise<TCourseUpdateParams | undefined> {
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ slug }).populate({
      path: "lectures",
      model: lectureModel,
      select: "_id title",
      match: { _destroy: false },
      populate: {
        path: "lessons",
        model: lessonModel,
        match: { _destroy: false },
      }
    },
  );
    return JSON.parse(JSON.stringify(findCourse));
  } catch (error) {
    console.log(error);
  }
}

export async function createCourses(params: TCreateCourseParams) {
  try {
    await connectToDatabase();
    const course = await Course.create(params);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
    }
    
  } catch (error: any) {
    console.log("Error: ", error);
    return { success: false, error: error.message};
  }
}

export async function updateCourse(params: TUpdateCourseParams) {
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ slug: params.slug });
    if (!findCourse) return;
    await Course.findOneAndUpdate({ slug: params.slug }, params.updateData, {
      new: true,
    });
    revalidatePath(params.path || "/");
    return {
      success: true,
      message: "Cập nhật khóa học thành công!",
    };
  } catch (error) {
    console.log(error);
  }
}