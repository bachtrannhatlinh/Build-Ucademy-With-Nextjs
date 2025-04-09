import React from "react";
import { fetchCourseBySlug } from "@/lib/actions/course.actions";
import Heading from "@/components/typography/Heading";
import CourseUpdateContent from "@/components/course/CourseUpdateContent";

const Page = async ({ searchParams }: { searchParams: { slug: string } }) => {
  const params = await searchParams;
  const slug = params?.slug;
  
  if (!slug) {
    return <div>Không tìm thấy slug</div>;
  }
  
  const course = await fetchCourseBySlug({ slug });
  if (!course) return <div>Không tìm thấy khoá học</div>;

  return (
    <div>
      {course && (
        <div>
          <Heading>
            Nội dung: <strong className="text-primary">{course.title}</strong>
          </Heading>
          <CourseUpdateContent course={course} />
        </div>
      )}
    </div>
  );
};

export default Page;
