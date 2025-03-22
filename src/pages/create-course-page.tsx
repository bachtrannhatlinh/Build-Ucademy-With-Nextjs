"use client";

import CreateCourseContainer from '@/components/course/CourseAddNew';
import dynamic from 'next/dynamic';

// Dynamically import the CreateCourseContainer to prevent SSR
const DynamicCreateCourseContainer = dynamic(() => Promise.resolve(CreateCourseContainer), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export interface CreateCoursePageProps {}

function CreateCoursePage(_props: CreateCoursePageProps) {
  return <DynamicCreateCourseContainer />;
}

export default CreateCoursePage;
