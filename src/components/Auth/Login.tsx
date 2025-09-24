'use client';

import { useForm } from "react-hook-form";
import { loginFormSchema, type Login } from "../FormSchema/ShacdnForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { checkin } from "@/Data/LoginField";
import { ShacdnLogin } from "../Shacdn/ShacdnLogin";
import axios from "axios";
import { useState } from "react";
// import { useAppContext } from "../useContext/useContext";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function LoginComp() {
    const [loading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<Login>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    async function onSubmit(values: Login) {
        try {
            setIsLoading(true);
            const res = await axios.post('http://localhost:4000/api/v1/login', values);
            if (res) {
                toast.success(`${res.data.email} has log in`);
                router.push('/task');
                toast.success(`${res.data.user.firstName} has successfully log in`);
            }
            localStorage.setItem('user-data', JSON.stringify(res.data));
            const token = res.data.user.token;
            const id = res.data.user._id;
            localStorage.setItem('id', id);
            localStorage.setItem('token', token);
            console.log(values);
            
        } catch (error) {
            setIsLoading(false);
            console.log(error, 'error-message');
            let errorResponse = 'Network error'
            if (axios.isAxiosError(error)) {
                errorResponse = error.response?.data.message || errorResponse
            }
            toast.success(`${errorResponse}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500 ">
            <Link className="fixed top-0" href='/'>
                <div className="flex items-center gap-1.5">
                    <ArrowBigLeft className="mt-1 w-5 h-5" />
                    <p className="text-black">home</p>
                </div>
            </Link>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-[94%] md:w-[40%] lg:w-[30%]">
                    <h1 className="font-bold text-4xl text-pretty font-mono text-center">Welcome Back!!</h1>
                    <div className="bg-transparent shadow-2xl rounded-[10px]  p-6 border-b-white hover:border-b-blue-600 border-b-[4px]">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                {checkin.map((field, index) => (
                                    <div key={index}>
                                        <ShacdnLogin {...field} control={form.control} />
                                    </div>
                                ))}
                                <Button className="text-white bg-green-500 hover:bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500 hover:text-white cursor-pointer w-full" variant='ghost' type="submit">{loading ? 'loading' : 'Login'}</Button>
                            </form>
                        </Form>
                        <Link href='/'>
                            <p

                                className="text-center text-pretty hover:underline underline-offset-2 mt-4 cursor-pointer font-sans"
                            >
                                Dont have an account? Sign up
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

} 