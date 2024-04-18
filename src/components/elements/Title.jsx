import React from 'react'

export default function Title({ title, classname }) {
  return (
    <div className={` text-2xl font-black ${classname}`}>
      {title}
    </div>
  )
}
