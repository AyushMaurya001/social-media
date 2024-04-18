import { z } from 'zod';

export const signupSchema = z.object({
    username: z.string().min(1, {
        message: "Username must be atleast 2 characters",
    }),
    email: z.string().email({
        message: "Enter a valid email"
    }),
    password: z.string().min(8, {
        message: "Password must be atleast 8 characters"
    })
})

export const signinSchema = z.object({
    email: z.string().email({
        message: "Enter a valid email"
    }),
    password: z.string().min(4, {
        message: "Password must be atleast 4 characters"
    })
})

export const createPostSchema = z.object({
    caption: z.string().min(4, {
        message: "Caption must contain at least 4 character(s)"
    }).max(2200, {
        message: "Caption must contain at max 2200 character(s)"
    }),
    location: z.string().min(2, {
        message: "Location must contain at least 2 character(s)"
    }).max(100, {
        message: "Location must contain at max 100 character(s)"
    }),
    tags: z.string(),
})