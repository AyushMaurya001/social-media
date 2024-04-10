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

export default function Signup() {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  function onSubmit() {
    console.log(values)
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
          <Button type="submit" className="w-full" >Submit</Button>
        </form>
      </Form>
      <div className=' flex gap-1'>
        <Description description='Already have an account?' />
        <Anchor content='Sign in' path='/signin' />
      </div>
    </div>
  )
}
