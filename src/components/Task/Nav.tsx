'use client';

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAppContext } from "../useContex/CreateContext";
import Link from "next/link";
import { Menu } from "lucide-react";

export function Header() {
    const router = useRouter();
    const { handleViewTask, id, slide, openHandle } = useAppContext();

    const [firstName, setFirstName] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setFirstName(localStorage.getItem("firstName"));
        }
    }, []);

    const handleLogOut = () => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user-data");
        if (token && userData) {
            localStorage.removeItem("token");
            localStorage.removeItem("user-data");
            router.push("/");
        }
    };

    return (
        <div>
            <div className="block lg:hidden">
                <div className="flex justify-between items-center w-full fixed top-0 bg-purple-800 py-2.5 px-4 shadow-md z-50">
                    <p className="font-medium text-gray-700">
                        Hi {firstName || "Guest"}
                    </p>
                    <Button onClick={openHandle} size="icon" variant="outline">
                        <Menu className="w-5 h-5" />
                    </Button>
                </div>

                <div className="fixed w-full top-16 px-4 z-50">
                    {slide && (
                        <div className="flex flex-col gap-2 bg-gray-50 shadow-md rounded-md p-4 animate-slideDown">
                            <Link href="/task">
                                <Button variant='ghost' className="bg-blue-400 w-full cursor-pointer hover:bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500">Create task</Button>
                            </Link>
                            <Link href="/update-task">
                                <Button variant='ghost' className="bg-blue-400 w-full cursor-pointer hover:bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500">Update task</Button>
                            </Link>
                            <Button variant='ghost' className="bg-blue-500 w-full cursor-pointer hover:bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500">Sign up</Button>
                            <Button variant='ghost' onClick={handleLogOut} className="bg-blue-600 w-full hover:bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500">
                                Logout
                            </Button>
                            <Button
                                onClick={() => id && handleViewTask(id)}
                                className="bg-blue-700 w-full cursor-pointer hover:bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500"
                                variant='ghost'
                            >
                                View task
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="hidden lg:flex gap-3 items-center justify-end px-6 py-4 bg-black text-black shadow-md fixed top-0 w-full z-50">
                <p className="font-medium text-gray-700 mr-auto">
                    Hi {firstName || "Guest"}
                </p>
                <Link href="/task">
                    <Button variant='ghost' className="cursor-pointer bg-white text-[#8888] text-xs border hover:bg-white">Create task</Button>
                </Link>
                <Link href="/update-task">
                    <Button variant='ghost' className=" cursor-pointer bg-white text-xs text-[#8888] border hover:bg-white">Update task</Button>
                </Link>
                <Button variant='ghost' className="cursor-pointer bg-white text-xs text-[#8888] border rounded-[10px] hover:bg-white">Sign up</Button>
                <Button variant='ghost' className="cursor-pointer bg-white text-xs text-[#8888] border hover:bg-white" onClick={handleLogOut}>Logout</Button>
                <Button variant='ghost' className="cursor-pointer bg-white text-xs text-[#8888] border hover:bg-white" onClick={() => id && handleViewTask(id)}>View task</Button>
            </div>
        </div>
    );
}