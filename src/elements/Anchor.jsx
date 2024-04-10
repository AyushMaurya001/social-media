import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Anchor({ content, path }) {
  const navigate = useNavigate();

  return (
    <div onClick={() => {
      navigate(path);
    }} className=' hover:underline cursor-pointer'>
        {content}
    </div>
  )
}
