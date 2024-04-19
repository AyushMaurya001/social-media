import { useUserContext } from '@/context/AuthContext';
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from '@/lib/react-query/queriesAndMutations';
import { checkIsLiked } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { Loader } from '.';

export default function PostStats({ post, className }) {
  const { user } = useUserContext();

  const likedList = post.likes.map((user) => user.$id);

  const [likeStatus, setLikeStatus] = useState(checkIsLiked(likedList, user.id));
  const [likes, setLikes] = useState(likedList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost, isPending: isLikingPost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();
  const savedPost = currentUser?.save.find((record) => record.post.$id === post.$id);

  useEffect(() => {
    setIsSaved(!!savedPost)
  }, [currentUser]);

  const handleLikePost = (e) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(user.id)){
      likesArray = likesArray.filter((Id) => Id!==user.id);
    } else {
      likesArray.push(user.id);
    }
    setLikes(likesArray);
    setLikeStatus(status => !status);
    likePost({ postId: post.$id, likesArray });
  }

  const handleSavePost = (e) => {
    e.stopPropagation();
    if (savedPost){
      setIsSaved(false);
      deleteSavedPost({ savedPostId: savedPost.$id });
    } else {
      savePost({ postId: post.$id, userId: user.id});
      setIsSaved(true);
    }
  }

  return (
    <div className={` w-full px-2 flex justify-between items-center ${className}`}>
      <div className=' flex gap-2'>
        {
          isLikingPost 
          ? <Loader /> 
          : <img
            src={likeStatus ? '/images/liked.svg' : '/images/like.svg'}
            alt='like image'
            className=' w-6 cursor-pointer'
            onClick={(e) => handleLikePost(e)}
          />
        }
        
        {likes.length}
      </div>
        {
          isSavingPost || isDeletingSavedPost
          ? <Loader /> 
          : <img
            src={isSaved ? '/images/save.svg' : '/images/saved.svg'}
            alt='save image'
            className=' w-6 cursor-pointer'
            onClick={(e) => handleSavePost(e)}
          />
        }
    </div>
  )
}
