import React from 'react'

export default function Description({ description, classname }) {
  return (
    <div className={` text-foreground/50 ${classname}`}>
        {description}
    </div>
  )
}
