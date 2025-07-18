import React from 'react'
import OrderCourseContainer from '@/components/order/OrderCourseContainer'
import { PopulatedOrderModelProps } from '../database/order.model'

const OrderCoursePage = ({listOrder}: {listOrder: PopulatedOrderModelProps[]}) => {
  return (
    <>
      <OrderCourseContainer listOrder={listOrder}/>
    </>
  )
}

export default OrderCoursePage