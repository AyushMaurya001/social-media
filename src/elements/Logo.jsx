import React from 'react'

export default function Logo() {
  return (
    <div className=' flex m-2'>
        <img
            src='/public/images/logo.jpeg'
            alt='logo'
            className='w-14 rounded-full border border-border'
        />
        <p className='font-geist text-3xl flex justify-center items-center mx-2'>NetworkNest</p>
    </div>
  )
}
