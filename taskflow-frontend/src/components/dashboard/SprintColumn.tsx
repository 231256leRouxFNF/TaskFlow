import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import type { Task } from "@/types/task";

interface SprintColumnProps {
  title: string;
  dotColor: string;
  tasks: Task[];

  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

export default function SprintColumn({
  title,
  tasks,
  updateTask,
  deleteTask,
}: SprintColumnProps) {

  const dotColor = {
    "To Do": "bg-slate-500",
    "In Progress": "bg-sky-500",
    "Review": "bg-amber-400",
    "Done": "bg-emerald-500",
  }[title];

  return (

    <Droppable droppableId={title}>

      {(provided) => (

        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex min-h-[500px] flex-col rounded-xl border border-border bg-card"
        >

          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4">

            <div className="flex items-center gap-2">

              <div className={`h-2 w-2 rounded-full ${dotColor}`} />

              <h3 className="text-sm font-semibold">
                {title}
              </h3>

            </div>

            <span className="rounded-md bg-muted px-2 py-0.5 text-xs">
              {tasks.length}
            </span>

          </div>

          {/* Cards */}

          <div className="flex-1 space-y-3 p-3">

            {tasks.map((task, index) => (

              <TaskCard
                key={task.id}
                index={index}
                task={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />

            ))}

            {provided.placeholder}

          </div>

        </div>

      )}

    </Droppable>

  );

}