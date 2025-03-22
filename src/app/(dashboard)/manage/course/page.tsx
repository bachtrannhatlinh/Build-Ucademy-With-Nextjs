import { CourseManage } from '@/components/course/CourseManage';
import { getAllCourses } from '@/lib/actions/course.actions';

async function ManageCoursePage() {
  const courses = await getAllCourses();

  if (!courses) return null;
  
  return (
      <CourseManage courses={courses} />
  );
}

export default ManageCoursePage;
