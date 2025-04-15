"use server";

import {
  TCourseUpdateParams,
  TCreateCourseParams,
  TGetAllCourseParams,
  TUpdateCourseParams,
} from "@/types";
import { connectToDatabase } from "../mongoose";
import Course, { ICourse } from "@/app/database/course.model";
import { revalidatePath } from "next/cache";
import lectureModel from "@/app/database/lecture.model";
import lessonModel from "@/app/database/lesson.model";
import { FilterQuery } from "mongoose";
import { CourseStatus } from "@/constants";
import { CourseItemData } from "@/types/app.type";
import UserModel from "@/app/database/user.model";
import CourseModel from "@/app/database/course.model";
import LectureModel from "@/app/database/lecture.model";
import LessonModel from "@/app/database/lesson.model";

// fetching
export async function getAllCourses(
  params: TGetAllCourseParams
): Promise<ICourse[] | undefined> {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Course> = {};
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }
    
    if (status && status !== CourseStatus.ALL) {
      query.status = status;
    }

    const courses = await Course.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ create_at: -1 });
      
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
      },
    });
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
    };
  } catch (error: any) {
    console.log("Error: ", error);
    return { success: false, error: error.message };
  }
}

export async function updateCourse(params: TUpdateCourseParams) {
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ slug: params.slug });
    if (!findCourse) return;
    console.log("params", params);
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

export async function fetchCoursesOfUser(
  userId: string,
): Promise<CourseItemData[] | undefined> {
  try {
    connectToDatabase();
    
    const rawUser = await UserModel.findOne({ clerkId: userId });
    
    const userCourses = await CourseModel.find({ 
      author: rawUser?._id,
      status: CourseStatus.APPROVED 
    });

    if (userCourses.length > 0 && rawUser) {
      await UserModel.findByIdAndUpdate(
        rawUser._id,
        { 
          $addToSet: { 
            courses: { 
              $each: userCourses.map(course => course._id) 
            } 
          } 
        },
        { new: true }
      );
    }
    
    const findUser = await UserModel.findOne({ clerkId: userId }).populate({
      path: 'courses',
      model: CourseModel,
      match: {
        status: CourseStatus.APPROVED,
      },
      populate: {
        path: 'lectures',
        model: LectureModel,
        select: 'lessons',
        populate: {
          path: 'lessons',
          model: LessonModel,
          select: 'slug',
        },
      },
    });
    
    if (!findUser) {
      return;
    }
    
    const courses = JSON.parse(JSON.stringify(findUser.courses));
    return courses;
  } catch (error) {
    console.error('Error in fetchCoursesOfUser:', error);
  }
}
