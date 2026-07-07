import type { Task } from "@/types/task";

export const tasks: Task[] = [
  {
    id: "TFS-001",
    title: "Implement JWT authentication middleware",
    priority: "Critical",
    assignee: "AC",
    status: "Done",
  },
  {
    id: "TFS-002",
    title: "Design Entity Framework Core schema",
    priority: "High",
    assignee: "MS",
    status: "Review",
  },
];