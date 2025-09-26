'use client';
import { Header } from "@/components/Task/Nav";
import { UserTask } from "@/components/Task/UserTask";



export default function TaskPage() {
    return (
        <div className="pb-8 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500 min-h-screen">
            <Header />
            <div className="pt-16">
                <UserTask />
            </div>
        </div>
    )
}