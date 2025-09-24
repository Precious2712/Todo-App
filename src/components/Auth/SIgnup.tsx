'use client';

import { useForm } from "react-hook-form";
import { signupFormSchema, type Signup } from "../FormSchema/ShacdnForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { register } from "@/Data/SignupField";
import { ShacdnSignup } from "../Shacdn/ShacdnSignup";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export function SignupComp() {
    const [loading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<Signup>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            password: '',
            email: '',
        }
    })

    async function onSubmit(values: Signup) {
        try {
            setIsLoading(true);
            const res = await axios.post('https://todo-api-wnbz.onrender.com/api/v1/register', values);
            if (res) {
                toast.success(`${res.data.firstName} your sign up is successfull`);
                router.push('/login');
            }
            
        } catch (error) {
            setIsLoading(false);
            console.log(error, 'error-message');
            let errorResponse = 'error'
            if (axios.isAxiosError(error)) {
                errorResponse = error.response?.data.message || errorResponse;
                toast.success(`${errorResponse}`);
            }

        } finally {
            setIsLoading(false);
        }
        console.log(values)
    }

    return (
        <div className="bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500 ">
            <Link className="fixed top-0" href='/'>
                <div className=" flex items-center gap-1.5">
                    <ArrowBigLeft className="mt-1 w-5 h-5" />
                    <p className="text-black">home</p>
                </div>
            </Link>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-[94%] md:w-[40%] lg:w-[30%] bg-transparent">
                    <h1 className="font-bold text-4xl text-pretty font-mono text-center">Create Account</h1>
                    <div className="bg-transparent shadow-2xl rounded-[10px]  p-6 border-b-white hover:border-b-blue-600 border-b-[4px]">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                {register.map((field, index) => (
                                    <div key={index}>
                                        <ShacdnSignup {...field} control={form.control} />
                                    </div>
                                ))}
                                <Button className="text-white bg-green-500 hover:bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500 hover:text-white cursor-pointer w-full" variant='ghost' type="submit">{loading ? 'loading' : 'Submit'}</Button>
                            </form>
                        </Form>
                        <Link href='/login'>
                            <p
                                className="text-center text-pretty hover:underline underline-offset-2 mt-4 cursor-pointer font-sans"
                            >
                                Already have an account? Sign in
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

} 