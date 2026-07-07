export interface Task {
    id: string;
    title: string;
    description: string;
    priority: "Low" | "Medium" | "High" | "Critical";
    status: "To Do" | "In Progress" | "Review" | "Done";
    assignee: string;
    project: string;
    dueDate: string;
}