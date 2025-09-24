'use client';

import { useAppContext } from "@/components/useContex/CreateContext";
import { useState } from "react";


export default function DashBoard() {
    const { allUserTask } = useAppContext();
    const [loading, setLoading] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold mb-6">Your Tasks</h1>

            <div className="min-h-screen bg-gray-50 p-6">
                <h1 className="text-2xl font-bold mb-6">Your Tasks</h1>

                {allUserTask && allUserTask.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allUserTask.map((task) => (
                            <div
                                key={task._id}
                                className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between border border-gray-100 hover:shadow-lg transition"
                            >
                                <div>
                                    <p className="text-sm text-gray-600 mt-2">

                                    </p>
                                </div>

                                <button
                                    disabled={loading === task._id}
                                    className="mt-4 py-2 px-4 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading === task._id ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No tasks found.</p>
                )}
            </div>
        </div>
    );
}
