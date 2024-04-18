import React from 'react'
import { Logo, LogoutBtn } from '.'
import { Link } from 'react-router-dom'
import { useUserContext } from '@/context/AuthContext';

export default function Topbar() {
  const { user } = useUserContext();

  return (
    <div className=' w-full h-16 flex px-4 bg-background border border-border justify-between items-center'>
      <div>
        <Link to='/'>
          <Logo />
        </Link>
      </div>
      <div className=' flex justify-center items-center gap-2'>
        <LogoutBtn />
        <Link to={`/profile/${user.id}`}>
          <img
            src={ user.imageUrl || '/images/logo.svg' }
            alt='profile picture'
            className='w-8 h-8 rounded-full'
          />
        </Link>
      </div>
    </div>
  )
}
