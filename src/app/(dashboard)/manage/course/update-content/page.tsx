import React from "react";
import { fetchCourseBySlug } from "@/lib/actions/course.actions";
import Heading from "@/components/typography/Heading";
import CourseUpdateContent from "@/components/course/CourseUpdateContent";

const page = async ({ searchParams }: { searchParams: { slug: string } }) => {
  const course = await fetchCourseBySlug({ slug: searchParams.slug });
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

export default page;
