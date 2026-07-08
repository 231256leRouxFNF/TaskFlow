import { useEffect, useState } from "react";
import type { Task } from "@/types/task";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task: Task) => {
        setTasks(prev => [...prev, task]);
    };

    return {
        tasks,
        addTask,
    };
}