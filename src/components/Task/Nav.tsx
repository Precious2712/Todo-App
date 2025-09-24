'use client';

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function Header() {
    const router = useRouter();

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
                <Button>View task</Button>
            </div>
        </div>
    )
}