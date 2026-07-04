export interface Task {
    id: string;
    title: string;
    priority: "Low" | "Medium" | "High" | "Critical";
    assignee: string;
    status: "To Do" | "In Progress" | "Review" | "Done";
}