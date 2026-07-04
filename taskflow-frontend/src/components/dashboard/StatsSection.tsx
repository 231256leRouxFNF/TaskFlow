import StatsCard from "./StatsCard";

import {
    Hash, 
    CircleCheck,
    RefreshCcw,
    CircleAlert
} from "lucide-react";

export default function StatsSection() {
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            <StatsCard
                title="Total Tasks"
                value={12}
                subtitle="+3 this week"
                icon={Hash}
            />

            <StatsCard
                title="Completed"
                value={2}
                subtitle="17% completion rate"
                icon={CircleCheck}
                iconColor="text-emerald-400"
            />

            <StatsCard
                title="In Progress"
                value={3}
                subtitle="Across 3 projects"
                icon={RefreshCcw}
                iconColor="text-sky-400"
            />

            <StatsCard
                title="Overdue"
                value={1}
                subtitle="Needs Attention"
                icon={CircleAlert}
                iconColor="text-red-400"
            />

        </div>
    );
}