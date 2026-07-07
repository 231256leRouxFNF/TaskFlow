interface PriorityBadgeProps {
  priority: "Low" | "Medium" | "High" | "Critical";
}

const styles = {
  Low: "bg-slate-700 text-slate-300",
  Medium: "bg-yellow-500/20 text-yellow-400",
  High: "bg-orange-500/20 text-orange-400",
  Critical: "bg-red-500/20 text-red-400",
};

export default function PriorityBadge({
  priority,
}: PriorityBadgeProps) {
  return (
    <span
      className={`rounded-md px-2 py-1 text-xs font-medium ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}