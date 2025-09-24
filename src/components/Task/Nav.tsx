'use client';

import axios from "axios";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAppContext } from "../useContex/CreateContext";

export function Header() {
    const router = useRouter();
    const {handleViewTask} = useAppContext();

    const handleLogOut = () => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user-data');
        if (token && userData) {
            localStorage.removeItem('token');
            localStorage.removeItem('user-data');
            router.push('/');
        }
    }

    return (
        <div className="bg-black fixed top-0 w-full py-3.5">
            <div className="flex justify-end gap-3.5">
                <Button>Sign up</Button>
                <Button onClick={handleLogOut}>Logout</Button>
                <Button onClick={handleViewTask}>View task</Button>
            </div>
        </div>
    )
}