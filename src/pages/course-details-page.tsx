import CourseDetailsContainer from '@/components/course/course-details-container';
import { TCourseUpdateParams } from '@/types';

export interface CourseDetailsPageProps {
  courseDetails: TCourseUpdateParams | undefined;
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