import React from 'react'
import { Loader, PostStats } from '.';
import { Link, useNavigate } from 'react-router-dom';
import { timeFormat } from '@/lib/utils';
import { useUserContext } from '@/context/AuthContext';
import { useDeletePost, useDeleteSavedPost, useGetCurrentUser } from '@/lib/react-query/queriesAndMutations';
import { useToast } from '../ui/use-toast';

export default function PostDetails({ post }) {
  const { user } = useUserContext();

  const { toast } = useToast();

  const navigate = useNavigate();

  const { mutateAsync: deletePost, isPending: deletingPost, isSuccess } = useDeletePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();
  const savedPost = currentUser?.save.find((record) => record.post.$id === post.$id);

  const deletePostHandler = async () => {
    if (savedPost){
      deleteSavedPost({ savedPostId: savedPost.$id });
    }
    const deletionStatus = await deletePost({
      postId: post.$id,
      userId: user.id
    });
    if (deletionStatus){
      toast({
        title: "Post deleted successfully"
      })
    } else {
      toast({
        title: "Please try again!"
      })
    }
    navigate("/");
  }

  return (
    <div className=' w-[90%] rounded-md border border-border p-5 flex flex-col gap-3 justify-center items-center xl:flex-row h-full'>

      <div className=' w-full xl:w-[50%] xl:h-full flex justify-center items-center xl:items-start'>
        <img
          src={post.imageUrl}
          alt='post image'
          className=' w-full rounded-md object-cover'
        />
      </div>

      <div className=' w-full xl:h-full xl:w-[50%] flex flex-col justify-start items-center gap-3 p-2'>

        <div className=' w-full flex justify-between items-center'>
          <div className=' w-full flex gap-3 justify-start items-center'>
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
          <div className=' flex justify-center items-center gap-4'>
            <Link to={`/update-post/${post.$id}`} className={` w-7 flex justify-center items-center ${post.creator.$id === user.id ? 'visible' : 'hidden'}`}>
              <img
                src='/images/edit.svg'
                alt='edit'
                className=' w-7'
              />
            </Link>
            <div to={`/update-post/${post.$id}`} className={` w-7 flex justify-center items-center cursor-pointer ${post.creator.$id === user.id ? 'visible' : 'hidden'}`} onClick={deletePostHandler}>
              {
              deletingPost ? 
                <Loader /> : 
                <img
                  src='/images/delete.svg'
                  alt='edit'
                  className=' w-7'
                />
              }
            </div>
          </div>
        </div>

        <div className=' w-full h-[1px] bg-primary/10'></div>

        <div className=' w-full flex flex-col justify-center items-center gap-2'>
          <div className=' w-[98%] text-left text-primary'>
            {post.caption}
          </div>
          <div className=' w-[98%] text-left flex gap-1'>
            {post.tags.map((tag, index) => (
              <p key={index} className=' text-primary/50'>
                #{tag}
              </p>
            ))}
          </div>
          <PostStats post={post} className={` py-1`} />
        </div>
      </div>

    </div>
  )
}
