import { IconLeftArrow, IconRightArrow } from "@/components/icons";
import { commonClassName } from "@/constants";
import { fetchCourseBySlug } from "@/lib/actions/course.actions";
import { getLessonBySlug } from "@/lib/actions/lession.action";
import { cn } from "@/lib/utils";

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
  const findLessonBySlug = await getLessonBySlug(
    findCourse?._id.toString() || "",
    slug
  );

  if (!findLessonBySlug) return null;

  const videoId =
    findLessonBySlug?.video_url?.split("v=").at(-1) || "dQw4w9WgXcQ";

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-10 min-h-screen">
      <div>
        <div className="relative mb-5 aspect-video">
          <iframe
            className="w-full h-full object-fill"
            src={`https://www.youtube.com/embed/${videoId}`}
          ></iframe>
        </div>
        <div className="flex justify-start gap-3 mt-5">
          <button className={cn(commonClassName.paginationButton)}>
            <IconLeftArrow />
          </button>
          <button className={cn(commonClassName.paginationButton)}>
            <IconRightArrow />
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default page;
