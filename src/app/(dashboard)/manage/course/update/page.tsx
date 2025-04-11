import UpdateCoursePage from "@/app/pages/update-course-page";
import Heading from "@/components/typography/Heading";

export interface UpdateCoursePageRootProps {
  searchParams: Promise<{
    slug: string;
  }>;
}

async function UpdateCoursePageRoot({
  searchParams,
}: UpdateCoursePageRootProps) {
  const resolvedParams = await searchParams;
  return (
    <div>
      <Heading>Cập nhật khóa học</Heading>
      <UpdateCoursePage slug={resolvedParams.slug} />
    </div>
  );
}

export default UpdateCoursePageRoot;
