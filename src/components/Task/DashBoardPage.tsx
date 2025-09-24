"use client"

import { Header } from "@/components/Task/Nav"
import { useAppContext } from "@/components/useContex/CreateContext"
import { useState } from "react"
import { Trash2, Calendar, Clock, CheckCircle2 } from "lucide-react"
import axios from "axios"

export function DashBoardPage() {
    const { allUserTask, setAllUserTask } = useAppContext();
    const [loading, setLoading] = useState<string | null>(null);
    const firstName = localStorage.getItem("firstName");

    const deleteUserTask = async (id: string) => {
        try {
            setLoading(id);

            await axios.delete(`http://localhost:4000/api/v2/deletetasks/${id}`);

            const storedId = localStorage.setItem("_id", id);
            console.log(storedId, "stored id");

            setAllUserTask(prev =>
                prev ? prev.filter(task => task._id !== id) : prev
            );
        } catch (error) {
            console.error("Error deleting task:", error);
        } finally {
            setLoading(null);
        }
    };

    function handleId(itemId: string) {
        alert(itemId);

        // Save it
        localStorage.setItem("itemId", itemId);

        // Retrieve it (if you want to log)
        const storedItem = localStorage.getItem("itemId");
        console.log(storedItem, "stored item");
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500">
            <Header />

            <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
                <div className="glass-effect rounded-2xl p-8 mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-1xl font-bold text-foreground text-balance lg:text-3xl">
                                {firstName ? `Welcome back, ${firstName}` : "Welcome back, Mr/Miss"}
                            </h1>
                            <p className="text-muted-foreground mt-1">Manage your tasks efficiently and stay productive</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-card/50 rounded-xl p-4 border border-border/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                    <Calendar className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                                    <p className="text-xl font-semibold text-foreground">{allUserTask ? allUserTask.length : 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card/50 rounded-xl p-4 border border-border/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-chart-2/20 flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-chart-2" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Active</p>
                                    <p className="text-xl font-semibold text-foreground">{allUserTask ? allUserTask.length : 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card/50 rounded-xl p-4 border border-border/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-chart-4/20 flex items-center justify-center">
                                    <CheckCircle2 className="w-4 h-4 text-chart-4" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Completed</p>
                                    <p className="text-xl font-semibold text-foreground">0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 pb max-w-7xl mx-auto">
                <div className="glass-effect rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground">Your Tasks</h2>
                    </div>

                    {allUserTask && allUserTask.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allUserTask.map((task) => (
                                <div
                                    onClick={() => handleId(task._id)}
                                    key={task._id}
                                    className=" group card-gradient rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
                                >
                                    <div className="flex-1 mb-6">
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-mono text-card-foreground leading-relaxed break-words">
                                                    {task.taskOne && <span className="block">{task.taskOne}</span>}
                                                    {task.taskTwo && <span className="block">{task.taskTwo}</span>}
                                                    {task.taskThree && <span className="block">{task.taskThree}</span>}
                                                    {task.taskFour && <span className="block">{task.taskFour}</span>}
                                                    {task.taskFive && <span className="block">{task.taskFive}</span>}
                                                </p>

                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Clock className="w-3 h-3" />
                                            <span>Active task</span>
                                        </div>
                                    </div>

                                    <button
                                        disabled={loading === task._id}
                                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-destructive/10 text-destructive text-sm font-medium hover:bg-destructive/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-destructive/20 hover:border-destructive/30"
                                    >
                                        {loading === task._id ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-destructive/30 border-t-destructive rounded-full animate-spin" />
                                                <span>Deleting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex items-center gap-2 cursor-pointer" onClick={() => deleteUserTask(task._id)}>
                                                    <Trash2 className="w-4 h-4 cursor-pointer" />
                                                    <span>Delete Task</span>
                                                </div>
                                            </>

                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                                <Calendar className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">No tasks found</h3>
                            <p className="text-muted-foreground max-w-sm mx-auto">
                                You don't have any tasks yet. Create your first task to get started with your productivity journey.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}