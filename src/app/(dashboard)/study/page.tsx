import React from 'react'
import CourseItem from '@/components/course/CourseItem'
import Heading from '@/components/typography/Heading'
import CourseGrid from '@/components/common/CourseGrid'
// import { getOrderByStatusApproved } from '@/lib/actions/order.actions'
import { fetchCoursesOfUser, getAllCourses } from '@/lib/actions/course.actions'
import { PopulatedOrderModelProps } from '@/app/database/order.model'
import { auth } from '@clerk/nextjs/server'

const page = async() => {
  const { userId } = await auth();
  console.log(userId, 'userId')
  const courses = await fetchCoursesOfUser(userId || "") || []
  return (
    <div className='p-3'>
      <Heading>Study Page</Heading>
      {/* <CourseGrid>
        {courses?.map((course) => (
          <CourseItem key={course.slug} course={course} />
        ))}
      </CourseGrid> */}
    </div>
  )
}

export default page

