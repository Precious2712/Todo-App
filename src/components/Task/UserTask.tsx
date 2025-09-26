'use client';

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { userTask } from "@/Data/Task";
import axios from "axios";
import { useState } from "react";
import { userTaskForm, type TaskForm } from "../FormSchema/ShacdnForm";
// import { useAppContext } from "../useContext/useContext";
import { ShacdTask } from "../Shacdn/TaskShacdn";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export function UserTask() {
    const [loading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<TaskForm>({
        resolver: zodResolver(userTaskForm),
        defaultValues: {
            taskOne: '',
            taskTwo: '',
            taskThree: '',
            taskFour: '',
            taskFive: ''
        }
    })

    async function onSubmit(values: TaskForm) {
        try {
            setIsLoading(true);
            const _id = localStorage.getItem('id');
            console.log(_id);


            const obj = {
                userId: _id,
                ...values
            }
            const res = await axios.post('https://todo-api-wnbz.onrender.com/api/v2/createtasks', obj);
            console.log(obj, 'wating');
            console.log(res);

            if (res) {
                toast.success('You can proceed to view task');
                router.push('/profile');
            }

        } catch (error) {
            setIsLoading(false);
            console.log(error, 'error-message');
            let errorResponse = 'error'
            if (axios.isAxiosError(error)) {
                errorResponse = error.response?.data.message || errorResponse;
                toast.error(`${errorResponse}`);
                router.push('/task');
            }

        } finally {
            setIsLoading(false);
        }
        console.log(values)
    }

    return (
        <div className="flex justify-center items-center mt-4">

            <div className="w-[94%] md:w-[40%] lg:w-[30%] bg-transparent">

                <div className="bg-transparent shadow-2xl rounded-[10px] p-6 border-b-white hover:border-b-blue-600 border-b-[4px]  mt-4">
                    <h1 className="font-bold text-3xl text-pretty text-blue-500 font-mono text-center">Create Task</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {userTask.map((field, index) => (
                                <div key={index}>
                                    <ShacdTask {...field} control={form.control} />
                                </div>
                            ))}
                            <Button className="text-white bg-green-500 hover:bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500 hover:text-white cursor-pointer w-full" variant='ghost' type="submit">{loading ? 'loading' : 'Create-task'}</Button>
                        </form>
                    </Form>
                </div>
            </div>

        </div>
    )

} 