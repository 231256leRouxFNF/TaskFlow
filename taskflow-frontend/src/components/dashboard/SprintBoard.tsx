import SprintColumn from "./SprintColumn";
import type { Task } from "@/types/task";

interface SprintBoardProps {
    tasks: Task[];
}

export default function SprintBoard({ tasks }: SprintBoardProps) {
  return (
    <section className="mt-8">

      <h2 className="mb-4 text-lg font-semibold">
        Sprint Board
      </h2>

      <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <SprintColumn
            title="To Do"
            dotColor="bg-slate-500"
            tasks={tasks.filter(t => t.status === "To Do")}
        />

        <SprintColumn
            title="In Progress"
            dotColor="bg-sky-500"
            tasks={tasks.filter(t => t.status === "In Progress")}
        />

        <SprintColumn
            title="Review"
            dotColor="bg-amber-400"
            tasks={tasks.filter(t => t.status === "Review")}
        />

        <SprintColumn
            title="Done"
            dotColor="bg-emerald-500"
            tasks={tasks.filter(t => t.status === "Done")}
        />

      </div>

    </section>
  );
}