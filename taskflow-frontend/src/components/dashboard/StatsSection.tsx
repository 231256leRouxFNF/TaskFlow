import StatsCard from "./StatsCard";
import type { Task } from "@/types/task";

import {
    Hash,
    CircleCheck,
    RefreshCcw,
    CircleAlert,
} from "lucide-react";

interface StatsSectionProps {
    tasks: Task[];
}

export default function StatsSection({
    tasks,
}: StatsSectionProps) {

    const totalTasks = tasks.length;

    const completedTasks =
        tasks.filter(task => task.status === "Done").length;

    const inProgressTasks =
        tasks.filter(task => task.status === "In Progress").length;

    const reviewTasks =
        tasks.filter(task => task.status === "Review").length;

    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            <StatsCard
                title="Total Tasks"
                value={totalTasks}
                subtitle="Across all projects"
                icon={Hash}
            />

            <StatsCard
                title="In Progress"
                value={inProgressTasks}
                subtitle="Currently active"
                icon={RefreshCcw}
                iconColor="text-sky-400"
            />

            <StatsCard
                title="Review"
                value={reviewTasks}
                subtitle="Awaiting approval"
                icon={CircleAlert}
                iconColor="text-amber-400"
            />

            <StatsCard
                title="Completed"
                value={completedTasks}
                subtitle={`${totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)}% completion`}
                icon={CircleCheck}
                iconColor="text-emerald-400"
            />

        </div>
    );
}