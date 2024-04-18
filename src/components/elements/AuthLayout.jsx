import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function AuthLayout() {
  const authenticated = false;

  return (
    <>
      {authenticated ? (
        <Navigate to='/' />
      ) : (
        <div className=' w-full h-screen flex justify-center items-center bg-background'>
          <Outlet />
          <img
            src='/images/collection-of-pictures.jpeg'
            alt='auth layout image'
            className='w-[0px] opacity-0 md:opacity-100 md:w-[50%] transition-all h-screen object-cover bg-no-repeat select-none'
          />
        </div>
      )}
    </>
  )
}
