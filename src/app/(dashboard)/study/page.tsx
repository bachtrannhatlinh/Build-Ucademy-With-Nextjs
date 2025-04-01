import React from 'react'
import { fetchCourseBySlug } from '@/lib/actions/course.actions'

export default async function StudyPage({
  searchParams,
}: {
  searchParams: { slug: string }
}) {
  const params = await searchParams
  const slug = params?.slug

  if (!slug) {
    return <div>No course selected</div>
  }

  const course = await fetchCourseBySlug({ slug })

  return (
    <div>
      <h1>Study Page</h1>
      {course && (
        <div>
          <h2>{course.title}</h2>
          {/* Add your study content here */}
        </div>
      )}
    </div>
  )
}
