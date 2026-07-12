import SprintColumn from "./SprintColumn";
import type { Task } from "@/types/task";

import {
  DragDropContext,
  type DropResult,
} from "@hello-pangea/dnd";

interface SprintBoardProps {
  tasks: Task[];
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

export default function SprintBoard({
  tasks,
  updateTask,
  deleteTask,
}: SprintBoardProps) {

  const handleDragEnd = (result: DropResult) => {

    if (!result.destination) return;

    const task = tasks.find(
      (t) => t.id === result.draggableId
    );

    if (!task) return;

    if (task.status === result.destination.droppableId) return;

    updateTask({
      ...task,
      status: result.destination.droppableId as Task["status"],
    });

  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>

      <section className="mt-8">

        <h2 className="mb-4 text-lg font-semibold">
          Sprint Board
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          <SprintColumn
            title="To Do"
            dotColor="bg-slate-500"
            tasks={tasks.filter((t) => t.status === "To Do")}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />

          <SprintColumn
            title="In Progress"
            dotColor="bg-sky-500"
            tasks={tasks.filter((t) => t.status === "In Progress")}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />

          <SprintColumn
            title="Review"
            dotColor="bg-amber-400"
            tasks={tasks.filter((t) => t.status === "Review")}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />

          <SprintColumn
            title="Done"
            dotColor="bg-emerald-500"
            tasks={tasks.filter((t) => t.status === "Done")}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />

        </div>

      </section>

    </DragDropContext>
  );
}