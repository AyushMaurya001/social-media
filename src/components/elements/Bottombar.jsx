import { bottombarContent } from '@/constants'
import React from 'react'
import { Button } from '../ui/button'
import { Link, useLocation } from 'react-router-dom'

export default function Bottombar() {
  const location = useLocation();

  return (
    <div className=' w-full h-16 flex px-4 bg-background border border-border justify-between items-center'>
      
      <ul className=' w-full h-[80%] flex justify-evenly items-center'>
        {bottombarContent.map((i) => {
          return (
            <li key={i.label} className={` h-full `}>
              <Link to={i.route}>
                <Button variant='ghost' className={` h-full flex flex-col ${location.pathname === i.route ? 'bg-secondary' : ''}`}>
                  <img
                    src={i.imageUrl}
                    alt={`${i.label} icon`}
                    className={` h-5`}
                  />
                  <div className=' text-sm'>
                    {i.label}
                  </div>
                </Button>
              </Link>
            </li>
          )
        })}
      </ul>
      
    </div>
  )
}
