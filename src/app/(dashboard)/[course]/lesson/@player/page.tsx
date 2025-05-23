import Heading from "@/components/typography/Heading";
import React from "react";
import {
  getAllLessonByCourse,
  getLessonBySlug,
} from "@/lib/actions/lession.actions";
import { fetchCourseBySlug } from "@/lib/actions/course.actions";
import { convertToPlainObject } from "@/utils/helper";
import VideoPlayer from "./VideoPlayer";

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

  if (!findLessonBySlug) return null;

  const getAllLesson = await getAllLessonByCourse(courseId);
  const validLessons = getAllLesson.filter((lesson) => !lesson._destroy);
  const prevLessonIndex = validLessons.findIndex(
    (lesson) => lesson.slug === slug
  );
  const nextLessonIndex = validLessons.findIndex(
    (lesson) => lesson.slug === slug
  );

  // Get the previous and next lesson objects
  const prevLesson = validLessons?.[prevLessonIndex - 1];
  const nextLesson = validLessons?.[nextLessonIndex + 1];

  const plainPrevLesson = convertToPlainObject(prevLesson);
  const plainNextLesson = convertToPlainObject(nextLesson);

  const linkPrevLesson = `/${course}/lesson?slug=${plainPrevLesson?.slug}`
  const linkNextLesson = `/${course}/lesson?slug=${plainNextLesson?.slug}`

  return (
    <div>
      <VideoPlayer linkPrevLesson={linkPrevLesson} linkNextLesson={linkNextLesson}/>

      <Heading className="mt-5 mb-10">{findLessonBySlug.title}</Heading>
      <div className="p-5 rounded-lg bgDarkMode border borderDarkMode entry-content">
        {findLessonBySlug.content && (
          <div
            dangerouslySetInnerHTML={{ __html: findLessonBySlug.content }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default page;
