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
import { Anchor, Description, Loader, Logo, Title } from '@/components/elements'
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
    <div className=' w-[65%] md:w-[100%] transition-all h-screen flex flex-col gap-4 justify-center items-center'>
      <div className=' w-full flex flex-col gap-1 justify-center items-center'>
        <Logo className='m-2' />
        <Title title='Create your new account' />
        <Description description='To use Snapgram, Please enter your details' />
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
                  <Input placeholder="" type="text" {...field} />
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
                  <Input placeholder="" type="email" {...field} />
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
                  <Input placeholder="" type="password" {...field} />
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
                  <Loader className={` fill-secondary`} />
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
