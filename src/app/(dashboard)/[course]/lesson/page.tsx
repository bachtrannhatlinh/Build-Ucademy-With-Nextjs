import { fetchCourseBySlug } from "@/lib/actions/course.actions";
import {
  getAllLessonByCourse,
  getLessonBySlug,
} from "@/lib/actions/lession.action";
import LessonNavigation from "./LessonNavigation";
import { convertToPlainObject } from "@/utils/helper";

import Lessontem from "@/components/lesson/Lessontem";
import Heading from "@/components/typography/Heading";
import { getHistory } from "@/lib/actions/history.actions";

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
  const validLessons = getAllLesson.filter((lesson) => !lesson._destroy);

  const prevLessonIndex = validLessons.findIndex(
    (lesson) => lesson.slug === slug
  );
  const nextLessonIndex = validLessons.findIndex(
    (lesson) => lesson.slug === slug
  );

  if (!findLessonBySlug) return null;

  const videoId =
    findLessonBySlug?.video_url?.split("v=").at(-1) || "dQw4w9WgXcQ";

  // Get the previous and next lesson objects
  const prevLesson = validLessons?.[prevLessonIndex - 1];
  const nextLesson = validLessons?.[nextLessonIndex + 1];

  const plainPrevLesson = convertToPlainObject(prevLesson);
  const plainNextLesson = convertToPlainObject(nextLesson);

  const lectures = findCourse?.lectures || [];

  const history = await getHistory({
    course: courseId,
  });

  console.log(history, "history");

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
          prevLessonIndex={
            !plainPrevLesson
              ? ""
              : `/${course}/lesson?slug=${plainPrevLesson.slug}`
          }
          nextLessonIndex={
            !plainNextLesson
              ? ""
              : `/${course}/lesson?slug=${plainNextLesson.slug}`
          }
        />
        <Heading className="mt-5 mb-10">{findLessonBySlug.title}</Heading>
        <div className="p-5 rounded-lg bgDarkMode border borderDarkMode entry-content">
          {findLessonBySlug.content && (
            <div
              dangerouslySetInnerHTML={{ __html: findLessonBySlug.content }}
            ></div>
          )}
        </div>
      </div>
      <div className="sticky top-5 right-0 max-h-[calc(100vh-100px)] overflow-y-auto">
        <div className="h-3 w-full rounded-full border borderDarkMode bgDarkMode mb-2">
          <div className="w-20 h-full rounded-full bg-primary"></div>
        </div>
        <Lessontem lectures={lectures} slug={slug} history={history} />
      </div>
    </div>
  );
};

export default page;
