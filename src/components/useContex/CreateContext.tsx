'use client';

import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Task } from "@/Data/user-task";

type AppContextType = {
    openHandle: () => void;
    slide: boolean;
    handleViewTask: () => void;
    allUserTask: Task[] | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
    children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
    const [slide, setSlide] = useState(false);
    const id = localStorage.getItem('id');
    const router = useRouter();

    const [allUserTask, setAllUserTask] = useState<Task[] | null>(null);

    const openHandle = () => {
        setSlide(!slide);
    }

    const handleViewTask = async () => {
        try {
            const res = await axios.get(
                `http://localhost:4000/api/v2/getUserTasks/${id}`
            );

            if (res.data && res.data.allData) {
                setAllUserTask(res.data.allData);
                router.push("/dash-board");
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    return (
        <AppContext.Provider
            value={{
                openHandle,
                slide,
                handleViewTask,
                allUserTask
            }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};