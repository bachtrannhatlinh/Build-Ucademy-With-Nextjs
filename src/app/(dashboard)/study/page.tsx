import React from 'react'
import CourseItem from '@/components/course/CourseItem'
import Heading from '@/components/typography/Heading'
import CourseGrid from '@/components/common/CourseGrid'
import { fetchCoursesOfUser } from '@/lib/actions/course.actions'
import { auth } from '@clerk/nextjs/server'

const page = async() => {
  const { userId } = await auth();
  
  if (!userId) {
    return (
      <div className='p-3'>
        <Heading>Please sign in to view your courses</Heading>
      </div>
    );
  }

  const courses = await fetchCoursesOfUser(userId) || [];
  
  return (
    <div className='p-3'>
      <Heading>Khu vực học tập</Heading>
      <CourseGrid>
        {courses?.map((course) => (
          <CourseItem key={course.slug} course={course} />
        ))}
      </CourseGrid>
    </div>
  )
}

export default page

