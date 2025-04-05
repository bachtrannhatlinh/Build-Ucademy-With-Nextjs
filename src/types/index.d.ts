import { ILecture } from "@/app/database/lecture.model";

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

export interface TCourseUpdateParams extends Omit<ICourse, "lectures"> { 
  lectureId: ILecture[];
};


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

export type TCourseUpdateContentParams = {
  _id: string;
  slug: string;
  lectures: ILecture[];
}

export type { TActiveLinkProps, TMenuItem, TCreateUserParams, TCreateCourseParams, TUpdateCourseParams };
