import { ILecture } from "@/app/database/lecture.model";
import { ILesson } from "@/app/database/lesson.model";

type TActiveLinkProps = {
  children: React.ReactNode;
  url: string;
};

type TMenuItem = {
  url: string;
  title: string;
  icon: React.ReactNode;
  onlyIcon?: boolean;
};

// User
type TCreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

// Course
export type TGetAllCourseParams = {
  page: number;
  limit: number;
  search?: string;
  status?: string;
};


export type TCreateCourseParams = {
  title: string;
  slug: string;
  author: string;
};
export type TUpdateCourseParams = {
  path?: string;
  slug: string;
  updateData: Partial<ICourse>;
};

export type TUpdateCourseLecture = {
  _id: string;
  title: string;
  lessons: ILesson[];
}


export interface TCourseUpdateParams extends Omit<ICourse, "lectures"> { 
  lectures: TUpdateCourseLecture[];
}


// Lecture
export type TCreateLectureParams = {
  course: string;
  title?: string;
  order?: number;
  path?: string;
};

export type TUpdateLectureParams = {
  lectureId: string;
  updateData: {
    title?: string;
    order?: number;
    path?: string;
    _destroy?: boolean;
  };
};

// Lesson
export type TCreateLessionParams = {
  lecture: string;
  course: string;
  title?: string;
  slug: string;
  path?: string;
  order?: number;
};

export type TCourseUpdateContentParams = {
  _id: string;
  slug: string;
  lectures: ILecture[];
}

export type TUpdateLessonParams = {
  lessonId: string;
  updateData: {
    title?: string;
    _destroy?: boolean;
    slug?: string;
    duration?: number;
    video_url?: string;
    content?: string;
  };
  path?: string;
};

// History
export type TCreateHistoryParams = {
  user?: string;
  course: string;
  lesson: string;
  checked?: boolean | string;
  path?: string;
};

export type { TActiveLinkProps, TMenuItem, TCreateUserParams, TCreateCourseParams, TUpdateCourseParams };
