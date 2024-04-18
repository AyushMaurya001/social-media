import { useUserContext } from '@/context/AuthContext'
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from '@/lib/react-query/queriesAndMutations'
import { checkIsLiked, timeFormat } from '@/lib/utils'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PostStats } from '.'

export default function PostCard({ post }) {

  const { user } = useUserContext();

  return (
    <div className=' w-[80%]  flex flex-col justify-center items-center p-4 border border-border rounded-2xl gap-4'>

      <div className=' w-full flex justify-between items-center'>
        <div className=' flex gap-3 justify-center items-center'>
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={post.creator.imageUrl}
              alt='profile avatar'
              className=' w-12 rounded-full'
            />
          </Link>
          <div className=' flex flex-col justify-center items-start'>
            <Link to={`/profile/${post.creator.$id}`}>
              {post.creator.name}
            </Link>
            <div className=' text-sm text-primary/30 flex gap-1'>
              <p>
                {timeFormat(post.$createdAt)}
              </p>
              -
              <p>
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link to={`/update-post/${post.$id}`} className={` px-2 ${post.creator.$id === user.id ? 'visible' : 'hidden'}`}>
          <img
            src='images/edit.svg'
            alt='edit'
            className=' w-8'
          />
        </Link>
      </div>

      <div className=' w-full px-1 text-left'>
        <div className=' text-lg'>
          {post.caption}
        </div>
        <ul className=' w-full flex gap-1'>
          {post.tags.map((tag) => <li key={tag} className=' text-primary/30'>
            #{tag}
          </li>)}
        </ul>
      </div>

      <Link to={`/post/${post.$id}`} className=' w-full'>
        <div className=' w-full'>
          <img
            src={post.imageUrl}
            alt='post image'
            className=' w-full h-96 object-cover object-center rounded-2xl'
          />
        </div>
      </Link>

      <PostStats post={post} />

    </div>
  )
}
