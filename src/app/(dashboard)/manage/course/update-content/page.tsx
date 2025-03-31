import React from 'react'
import { fetchCourseBySlug } from '@/lib/actions/course.actions'

export default async function UpdateContentPage({
  searchParams,
}: {
  searchParams: { slug: string }
}) {
  const course = await fetchCourseBySlug({ slug: searchParams.slug })

  return (
    <div>
      <h1>Update Course Content</h1>
      {course && (
        <div>
          <h2>{course.title}</h2>
          {/* Add your course content update form here */}
        </div>
      )}
    </div>
  )
}
