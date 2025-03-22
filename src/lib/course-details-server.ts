import { auth } from '@clerk/nextjs/server';
import { fetchCourseBySlug } from '@/lib/actions/course.actions';

export async function getCourseDetailsAndUserId(slug: string) {
  const courseDetails = await fetchCourseBySlug({ slug });
  const { userId } = await auth();
  return { courseDetails, userId };
}