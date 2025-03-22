"use server";

import { TCreateCourseParams, TUpdateCourseParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import Course, { ICourse } from "@/app/database/course.model";
import { revalidatePath } from "next/cache";

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
}): Promise<ICourse | undefined> {
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ slug });
    return JSON.parse(JSON.stringify(findCourse));
  } catch (error) {
    console.log(error);
  }
}

export async function createCourses(params: TCreateCourseParams) {
  try {
    await connectToDatabase();
    const course = await Course.create(params);
    console.log("Course: ", course);

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
    revalidatePath("/");
    return {
      success: true,
      message: "Cập nhật khóa học thành công!",
    };
  } catch (error) {
    console.log(error);
  }
}