import { Card } from "@/components/ui/card";
import type { Task } from "@/types/task";
import PriorityBadge from "./PriorityBadge";
import EditTaskDialog from "./EditTaskDialog";

import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

interface TaskCardProps {
  task: Task;
  index: number;

  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

export default function TaskCard({
  task,
  index,
  updateTask,
  deleteTask,
}: TaskCardProps) {

  const [open, setOpen] = useState(false);

  return (

    <Draggable
      draggableId={task.id}
      index={index}
    >

      {(provided) => (

        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => setOpen(true)}
          className="cursor-pointer"
        >

          <Card className="rounded-xl border border-sidebar-border bg-card p-4 transition-colors hover:border-primary/30 hover:bg-accent/20">

            <h3 className="mt-2 text-sm font-medium leading-6 text-foreground">
              {task.title}
            </h3>

            <div className="mt-5 flex items-center justify-between">

              <PriorityBadge priority={task.priority} />

              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold text-white">

                {task.assignee
                  ? task.assignee
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  : "?"}

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

      )}

    </Draggable>

  );

}