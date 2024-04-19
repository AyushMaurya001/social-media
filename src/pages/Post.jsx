import { Loader, PostDetails } from '@/components/elements';
import { useGetPostById } from '@/lib/react-query/queriesAndMutations';
import React from 'react'
import { useParams } from 'react-router-dom';

export default function Post() {
  const { id } = useParams();

  const { data: post, isPending, isError } = useGetPostById(id);

  if (isPending){
    return (
      <div className=' w-full min-h-screen flex justify-center items-center'>
        <Loader className={` fill-primary`} />
      </div>
    )
  } else if (isError){
    return (
      <div className=' w-full min-h-screen flex justify-center items-center'>
        POST NOT FOUND
      </div>
    )
  } else {
    return (
      <div className=' w-full py-10 flex justify-center items-center min-h-screen'>
        <PostDetails post={post} />
      </div>
    )
  }


}
