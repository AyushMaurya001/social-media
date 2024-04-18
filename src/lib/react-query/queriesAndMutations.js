import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { createPost, createUserAccount, deleteSavedPost, getCurrentUser, getPostById, getRecentPosts, likePost, savePost, signOutUserAccount, signinUserAccount, updatePost } from '../appwrite/api'

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (payload) => createUserAccount(payload)
  })
}

export const useSigninUserAccount = () => {
  return useMutation({
    mutationFn: (payload) => signinUserAccount(payload)
  })
}

export const useSignOutUserAccount = () => {
  return useMutation({
    mutationFn: signOutUserAccount
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: 'getRecentPosts'
      })
    }
  })
}

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: ['getRecentPosts'],
    queryFn: getRecentPosts,
  })
}

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, likesArray }) => likePost(postId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['getPostById', data?.$id]
      });
      queryClient.invalidateQueries({
        queryKey: ['getRecentPosts']
      });
      queryClient.invalidateQueries({
        queryKey: ['getPosts']
      });
      queryClient.invalidateQueries({
        queryKey: ['getCurrentUser']
      });
    }
  })
}

export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }) => savePost(postId, userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['getRecentPosts']
      })
      queryClient.invalidateQueries({
        queryKey: ['getPosts']
      })
      queryClient.invalidateQueries({
        queryKey: ['getCurrentUser']
      })
    }
  })
}

export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ savedPostId }) => deleteSavedPost(savedPostId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['getRecentPosts']
      })
      queryClient.invalidateQueries({
        queryKey: ['getPosts']
      })
      queryClient.invalidateQueries({
        queryKey: ['getCurrentUser']
      })
    }
  })
}

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: getCurrentUser,
  });
}

export const useGetPostById = (postId) => {
  return useQuery({
    queryKey: ["getPostById", postId],
    queryFn: () => getPostById(postId)
    // enabled: !!postId
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({data, post}) => updatePost({data, post}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getPostById']
      })
    }
  })
}

