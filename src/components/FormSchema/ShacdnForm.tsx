import { z } from "zod";

export const signupFormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email("Invalid email address").min(3, "Email is required"),
    password: z.string().min(7).max(12),
});

export const loginFormSchema = z.object({
    email: z.string().email("Invalid email address").min(3, "Email is required"),
    password: z.string().min(7).max(12),
});

export const userTaskForm = z.object({
    taskOne: z.string(),
    taskTwo: z.string(),
    taskThree: z.string(),
    taskFour: z.string(),
    taskFive: z.string()
})
export type TaskForm = z.infer<typeof userTaskForm>;
export type Signup = z.infer<typeof signupFormSchema>;
export type Login = z.infer<typeof loginFormSchema>;