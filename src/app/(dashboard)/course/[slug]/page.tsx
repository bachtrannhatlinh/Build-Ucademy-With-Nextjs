import CourseDetailsPage from '@/pages/course-details-page';
import { getCourseDetailsAndUserId } from '@/lib/course-details-server';

export interface CourseDetailsPageRootProps {
  params: Promise<{
    slug: string;
  }>;
}

async function CourseDetailsPageRoot({ params }: CourseDetailsPageRootProps) {
  const resolvedParams = await params;
  const { courseDetails, userId } = await getCourseDetailsAndUserId(resolvedParams.slug);
  
  return <CourseDetailsPage courseDetails={courseDetails} userId={userId} />;
}

export default CourseDetailsPageRoot;


