import { useEffect, useState } from "react";
import type { Task } from "@/types/task";

export function useLocalStorage() {
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

    const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
        prev.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
            )
        );
    };

    const deleteTask = (id: string) => {
        setTasks((prev) =>
            prev.filter((task) => task.id !== id)
        );
    };

    return {
        tasks,
        setTasks,
        addTask,
        updateTask,
        deleteTask,
    };
}