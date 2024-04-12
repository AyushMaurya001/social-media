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