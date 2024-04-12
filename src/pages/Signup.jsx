import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form" 
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signupSchema } from '@/lib/validation'
import { Anchor, Description, Logo, Title } from '@/elements'
import { createUserAccount, signinUserAccount } from '@/lib/appwrite/api'
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSigninUserAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate();
  const { toast } = useToast()
  const { checkAuthUser, isPending: isUserLoading } = useUserContext();

  const { mutateAsync: createUserAccount, isPending: isCreatingUserAccount } = useCreateUserAccount();

  const { mutateAsync: signinUserAccount, isPending: isSigningInUserAccount } = useSigninUserAccount();

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values) {
    const userAccount = await createUserAccount(values);
    if (!userAccount){
      return toast({
        title: "Sign up failed ⚠️",
        description: "Please try again.",
      });
    }
    const session = await signinUserAccount({
      email: values.email,
      password: values.password,
    })
    if (!session){
      return toast({
        title: "Sign up failed ⚠️",
        description: "Please try again.",
      });
    }
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn){
      form.reset();
      navigate('/');
    } else {
      return toast({
        title: "Sign up failed ⚠️",
        description: "Please try again.",
      });
    }
  }

  return (
    <div className=' w-[50%] md:w-[100%] transition-all h-screen flex flex-col gap-4 justify-center items-center'>
      <div className=' w-full flex flex-col gap-1 justify-center items-center'>
        <Logo />
        <Title title='Create your new account' />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-[350px] flex flex-col gap-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Vishnu" type="text" {...field} />
                </FormControl>
                {/* <FormDescription>
                  Enter your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="vishnu@gmail.com" type="email" {...field} />
                </FormControl>
                {/* <FormDescription>
                  Enter your email address
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="--------" type="password" {...field} />
                </FormControl>
                {/* <FormDescription>
                  Create a new password
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full flex justify-center items-center" >
            {
              isSigningInUserAccount | isCreatingUserAccount ? (
                <div className=' flex gap-2 justify-center items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className=' fill-primary-foreground h-6 animate-spin'><path d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path></svg>
                  Loading
                </div>
              ) : (
                <div>
                  Submit
                </div>
              )
            }
          </Button>
        </form>
      </Form>
      <div className=' flex flex-wrap gap-1'>
        <Description description='Already have an account?' />
        <Anchor content='Sign in' path='/signin' />
      </div>
    </div>
  )
}
