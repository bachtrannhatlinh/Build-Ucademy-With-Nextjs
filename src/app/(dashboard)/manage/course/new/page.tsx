import CreateCoursePage from '@/pages/create-course-page';
import Heading  from '@/components/typography/Heading';

export interface CreateCoursePageRootProps {}

function CreateCoursePageRoot(_props: CreateCoursePageRootProps) {
  return (
    <>
      <Heading>Tạo khóa học mới</Heading>
      <CreateCoursePage />
    </>
  );
}

export default CreateCoursePageRoot;
