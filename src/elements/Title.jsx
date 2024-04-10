import React from 'react'

export default function Title({ title, classname }) {
  return (
    <div className={` text-lg font-medium ${classname}`}>
        {title}
    </div>
  )
}
