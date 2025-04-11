"use client"

import React from 'react'

const LoadingPlayer = () => {
  return (
    <>
      <div className='aspect-video rounded-lg skeleton mb-5'></div>
      <div className='flex gap-3 mb-5'>
        <div className='size-10 rounded-lg skeleton'></div>
        <div className='size-10 rounded-lg skeleton'></div>
      </div>
      <div className='w-full h-9 mb-10 skeleton'></div>
    </>
  )
}

export default LoadingPlayer