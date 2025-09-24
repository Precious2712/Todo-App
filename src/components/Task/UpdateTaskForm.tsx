'use client'

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Header } from "./Nav"
import axios, { isAxiosError } from "axios"
import toast from "react-hot-toast"
import { useAppContext } from "../useContex/CreateContext"

const taskSchema = z.object({
  taskOne: z.string().min(1, "Task one is required"),
  taskTwo: z.string().min(1, "Task two is required"),
  taskThree: z.string().min(1, "Task three is required"),
  taskFour: z.string().min(1, "Task four is required"),
  taskFive: z.string().min(1, "Task five is required"),
})

type TaskFormValues = z.infer<typeof taskSchema>

export function UpdateTaskForm() {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskOne: "",
      taskTwo: "",
      taskThree: "",
      taskFour: "",
      taskFive: "",
    },
  })

  async function onSubmit(values: TaskFormValues) {
    const storedItem = localStorage.getItem("itemId");
    console.log(storedItem);
    console.log(values);
    if (!storedItem) {
      toast.error("No task ID found. Please select a task first.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:4000/api/v2/updatetasks/${storedItem}`,
        values
      );

      if (res.data.success) {
        toast.success("Task updated successfully!");
      } else {
        toast.error(res.data.message || "Failed to update task.");
      }
    } catch (error) {
      console.error(error);
      let msg = "An error has occurred";
      if (isAxiosError(error)) {
        msg = error.response?.data.message || msg;
      }
      toast.error(msg);
    }
  }


  return (
    <div className="bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500">
      <Header />

      <div className="min-h-screen flex justify-center items-center w-full pt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[80%] mx-auto lg:w-[30%]">

            <FormField
              control={form.control}
              name="taskOne"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task One</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first task" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taskTwo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Two</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter second task" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taskThree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Three</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter third task" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taskFour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Four</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter fourth task" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taskFive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Five</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter fifth task" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Update Task</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}