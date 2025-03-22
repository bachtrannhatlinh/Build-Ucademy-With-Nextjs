import CourseDetailsContainer from '@/components/course/course-details-container';
import { ICourse } from '@/app/database/course.model';

export interface CourseDetailsPageProps {
  courseDetails: ICourse | undefined;
  userId: string | null;
}

export default function CourseDetailsPage({ courseDetails, userId }: CourseDetailsPageProps) {
  return (
    <CourseDetailsContainer
      courseDetails={courseDetails}
      userId={userId}
    />
  );
}