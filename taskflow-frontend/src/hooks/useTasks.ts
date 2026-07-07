import { useEffect, useState } from "react";
import type { Task } from "@/types/task";

export function useTasks() {

    const [tasks, setTasks] = useState<Task[]>(() => {

        const saved = localStorage.getItem("tasks");

        if (!saved) return [];

        return JSON.parse(saved);

    });

    useEffect(() => {

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

    }, [tasks]);

    const addTask = (newTask: Task) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    return {
        tasks,
        setTasks,
        addTask,
    };
}
