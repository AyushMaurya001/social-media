import { Bottombar, Leftsidebar, Loader, PostCard, Topbar } from '@/components/elements'
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations'
import React from 'react'

export default function Home() {
  const { data: posts, isPending: isPostsPending, isError: isPostsError } = useGetRecentPosts();

  return (
    <div className=' min-h-screen w-full'>
      
      {isPostsPending && !posts ? <div className=' w-full min-h-screen p-4 flex justify-center items-center'>
        <Loader className=' fill-foreground' />
      </div> : <div className=' w-full flex flex-col justify-center items-center gap-4 py-4'>
        {posts.documents.map((post) => 
          <PostCard key={post.$id} post={post} />
        )}
      </div>}
      
    </div>
  )
}
