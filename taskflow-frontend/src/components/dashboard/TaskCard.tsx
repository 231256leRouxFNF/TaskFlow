import { Card } from "@/components/ui/card";
import type { Task } from "@/types/task";
import PriorityBadge from "./PriorityBadge";
import { useState } from "react";
import EditTaskDialog from "./EditTaskDialog";

interface TaskCardProps {
  task: Task;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

export default function TaskCard({
    task,
    updateTask,
    deleteTask,
}: TaskCardProps) {

    const [open, setOpen] = useState(false);

    return (

  <div 
  onClick={() => setOpen(true)} className="cursor-pointer">

    <Card className="rounded-xl border border-sidebar-border bg-card p-4 transition-colors hover:border-primary/30 hover:bg-accent/20">

      {/* Task ID */}
      {/* <p className="text-xs text-muted-foreground">
        {task.id}
      </p> */}

      {/* Title */}
      <h3 className="mt-2 text-sm font-medium leading-6 text-foreground">
        {task.title}
      </h3>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">

        <PriorityBadge priority={task.priority} />

        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold text-white">
          {task.assignee ? task.assignee .split(" ") .map(name => name[0]) .join("") .slice(0, 2).toUpperCase(): "?"}
        </div>

      </div>

    </Card>

    <EditTaskDialog
    open={open}
    onOpenChange={setOpen}
    task={task}
    updateTask={updateTask}
    deleteTask={deleteTask}
    />

  </div>

  );
}