import { Loader, PostForm } from '@/components/elements'
import { useGetPostById } from '@/lib/react-query/queriesAndMutations';
import React from 'react'
import { useParams } from 'react-router-dom'

export default function UpdatePost() {
  const { id } = useParams();

  const { data: post, isPending } = useGetPostById(id);

  if (isPending) return (
    <div className=' w-full min-h-screen flex justify-center items-center'>
      <Loader />
    </div>
  )

  return (
    <div className=' min-h-screen w-full flex flex-col items-center py-7'>
      
      <div className=' w-[90%] flex justify-start items-center gap-3 py-4'>
        <img
          src='/images/createPost.svg'
          alt='create post logo'
          className=' w-10'
        />
        <div className=' text-2xl'>
          Edit Post
        </div>
      </div>

      <div className=' w-full flex justify-center items-center'>
        <PostForm action="update" post={post} />
      </div>

    </div>
  )
}
