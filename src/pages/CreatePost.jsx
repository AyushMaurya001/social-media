import { PostForm } from '@/components/elements'
import React from 'react'

export default function CreatePost() {
  return (
    <div className=' min-h-screen w-full flex flex-col items-center py-7'>
      
      <div className=' w-[90%] flex justify-start items-center gap-3 py-4'>
        <img
          src='/images/createPost.svg'
          alt='create post logo'
          className=' w-10'
        />
        <div className=' text-2xl'>
          Create Post
        </div>
      </div>

      <div className=' w-full flex justify-center items-center'>
        <PostForm />
      </div>

    </div>
  )
}
