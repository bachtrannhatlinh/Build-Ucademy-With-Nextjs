import Lessontem from "@/components/lesson/Lessontem";
import { fetchCourseBySlug } from "@/lib/actions/course.actions";
import { getHistory } from "@/lib/actions/history.actions";
import { getAllLessonByCourse } from "@/lib/actions/lession.action";
import React from "react";

const page = async ({
  params,
  searchParams,
}: {
  params: { course: string };
  searchParams: { slug: string };
}) => {
  const { course } = await params;
  const { slug } = await searchParams;

  const findCourse = await fetchCourseBySlug({ slug: course });
  const courseId = findCourse?._id.toString();

  const lectures = findCourse?.lectures || [];

  const history = await getHistory({
    course: courseId,
  });

  const getAllLesson = await getAllLessonByCourse(courseId);
  const validLessons = getAllLesson.filter((lesson) => !lesson._destroy);


  const progressLesson = ((history?.length || 0) / validLessons.length) * 100;

  const url = `/${course}/lesson?slug=${slug}`;

  return (
    <div className="sticky top-5 right-0 max-h-[calc(100vh-100px)] overflow-y-auto">
      <div className="h-3 w-full rounded-full border borderDarkMode bgDarkMode mb-2">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${progressLesson}%` }}
        ></div>
      </div>
      <Lessontem lectures={lectures} slug={slug} history={history} url={url} />
    </div>
  );
};

export default page;
