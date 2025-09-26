'use client';

import { Header } from "@/components/Task/Nav";
import { UpdateTaskForm } from "@/components/Task/UpdateTaskForm";

export default function UpdateTaskPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500 pb-10">
            <Header />
            <div className="pt-20 ">
                <UpdateTaskForm />
            </div>
        </div>
    )
}