import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Bottombar, Leftsidebar, Topbar } from '.'

export default function RootLayout() {

  return (
    <>
      <div className=' w-full flex flex-col md:flex-row'>

        <div className='hidden md:flex h-screen sticky left-0 top-0'>
          <Leftsidebar />
        </div>
        <div className=' w-full sticky top-0 md:hidden'>
          <Topbar />
        </div>

        <Outlet />

        <div className=' w-full sticky bottom-0 md:hidden'>
          <Bottombar />
        </div>

      </div>
    </>
  )
}
