import OrderCoursePage from '@/app/pages/order-course-page'
import { getAllOrder } from '@/lib/actions/order.actions'
import React from 'react'

const page = async() => {
  const listOrder = await getAllOrder()
  return (
    <>
      <OrderCoursePage listOrder= {listOrder}/>
    </>
  )
}

export default page
