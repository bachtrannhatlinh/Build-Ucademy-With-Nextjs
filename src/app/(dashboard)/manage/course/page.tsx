import { CourseManage } from "@/components/course/CourseManage";
import { CourseStatus } from "@/constants";
import { getAllCourses } from "@/lib/actions/course.actions";

export default async function ManageCoursePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; status?: CourseStatus }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const search = params?.search;
  const status = params?.status;

  const courses = await getAllCourses({
    page,
    limit: 10,
    search,
    status,
  });

  if (!courses) return null;

  return <CourseManage courses={courses} />;
}
