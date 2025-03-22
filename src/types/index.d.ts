type TActiveLinkProps = {
  children: React.ReactNode;
  url: string;
};

type TMenuItem = {
  url: string;
  title: string;
  icon: React.ReactNode;
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
  slug: string;
  updateData: Partial<ICourse>;
};

export type { TActiveLinkProps, TMenuItem, TCreateUserParams, TCreateCourseParams, TUpdateCourseParams };
