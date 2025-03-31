import React from 'react'
import CourseItem from '@/components/course/CourseItem'
import Heading from '@/components/typography/Heading'
import CourseGrid from '@/components/common/CourseGrid'
import { getAllCourses } from '@/lib/actions/course.actions'

const page = async() => {
  const courses = await getAllCourses()
  return (
    <div className='p-3'>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {courses?.map((course) => (
          <CourseItem key={course.slug} course={course} />
        ))}
      </CourseGrid>
    </div>
  )
}

export default page
