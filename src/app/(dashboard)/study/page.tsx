import React from 'react'
import CourseItem from '@/components/course/CourseItem'
import Heading from '@/components/typography/Heading'
import CourseGrid from '@/components/common/CourseGrid'
import { getAllCourses } from '@/lib/actions/course.actions'
import { CourseStatus } from '@/constants'

const page = async() => {
  const courses = await getAllCourses({status: CourseStatus.APPROVED})
  return (
    <div className='p-3'>
      <Heading>Study Page</Heading>
      <CourseGrid>
        {courses?.map((course) => (
          <CourseItem key={course.slug} course={course} />
        ))}
      </CourseGrid>
    </div>
  )
}

export default page

