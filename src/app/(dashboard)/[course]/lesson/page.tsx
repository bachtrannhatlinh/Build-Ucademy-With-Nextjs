import { fetchCourseBySlug } from "@/lib/actions/course.actions";
import {
  getAllLessonByCourse,
  getLessonBySlug,
} from "@/lib/actions/lession.action";
import LessonNavigation from "./LessonNavigation";
import { convertToPlainObject } from "@/utils/helper";

import Lessontem from "@/components/lesson/Lessontem";

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

  const findLessonBySlug = await getLessonBySlug(courseId || "", slug);
  const getAllLesson = await getAllLessonByCourse(courseId);

  const prevLessonIndex = getAllLesson.findIndex(
    (lesson) => lesson.slug === slug
  );
  const nextLessonIndex = getAllLesson.findIndex(
    (lesson) => lesson.slug === slug
  );

  if (!findLessonBySlug) return null;

  const videoId =
    findLessonBySlug?.video_url?.split("v=").at(-1) || "dQw4w9WgXcQ";

  // Get the previous and next lesson objects
  const prevLesson = getAllLesson?.[prevLessonIndex - 1];
  const nextLesson = getAllLesson?.[nextLessonIndex + 1];

  const plainPrevLesson = convertToPlainObject(prevLesson);
  const plainNextLesson = convertToPlainObject(nextLesson);

  const lectures = findCourse?.lectures || [];

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-10 min-h-screen">
      <div>
        <div className="relative mb-5 aspect-video">
          <iframe
            className="w-full h-full object-fill"
            src={`https://www.youtube.com/embed/${videoId}`}
          ></iframe>
        </div>
        <LessonNavigation
          prevLessonIndex={!plainPrevLesson ? "" : `/${course}/lesson?slug=${plainPrevLesson.slug}`}
          nextLessonIndex={!plainNextLesson ? "" : `/${course}/lesson?slug=${plainNextLesson.slug}`}
        />
      </div>
      <Lessontem lectures={lectures} />
    </div>
  );
};

export default page;
