import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { createUserAccount, signOutUserAccount, signinUserAccount } from '../appwrite/api'

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