import React, { useState } from 'react'
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPostSchema } from '@/lib/validation'
import { Textarea } from '../ui/textarea'
import { FileUploader, Loader } from '.'
import { useCreatePost, useUpdatePost } from '@/lib/react-query/queriesAndMutations'
import { useToast } from '../ui/use-toast'
import { useUserContext } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function PostForm({ post, action }) {
  
  const { toast } = useToast();

  const navigate = useNavigate();

  const { user } = useUserContext();

  const { mutateAsync: createPost, isPending: isCreatingPost } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isUpdatingPost } = useUpdatePost();

  const [files, setFiles] = useState([]);

  const form = useForm({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      caption: post ? post?.caption : "",
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(",") : "",
    },
  });

  const onSubmit = async (value) => {

    const data = {
      caption: value.caption,
      files: files,
      location: value.location,
      tags: value.tags,
      userId: user.id,
    };

    if (action=="create"){
      const newPost = await createPost(data);
      if (!newPost){
        toast({
          title: "Please try again!",
        })
      } else {
        toast({
          title: "Posted Successfully!",
        })
      }
    } else {
      const updatedPost = await updatePost({data, post});
      if (!updatedPost){
        toast({
          title: "Please try again!",
        })
      } else {
        toast({
          title: "Post updated Successfully!",
        })
      }
    }

    navigate('/');

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-[90%] flex flex-col gap-4">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  setFiles={setFiles}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Tags (separated by comma " , ")</FormLabel>
              <FormControl>
                <Input placeholder='Trending, Nature, Art' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=' w-full flex gap-4 justify-end items-center'>
          <Button type="cancel" onClick={() => {
            navigate('/');
          }}>Cancel</Button>
          <Button type="submit">
            {isCreatingPost===true ? <div className=' flex justify-center items-center gap-2'>
              <Loader className={` fill-secondary`} />
              Creating
            </div> : isUpdatingPost===true ? <div className=' flex justify-center items-center gap-2'>
              <Loader className={` fill-secondary`} />
              Updating
            </div> : <div>
              Submit
            </div>}
          </Button>
        </div>
      </form>
    </Form>

  )
}
