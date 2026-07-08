import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
    Dialog, 
    DialogTrigger, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription,
    DialogFooter 
} from "@/components/ui/dialog";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Task } from "@/types/task";

interface TaskDialogProps {
    addTask: (task: Task) => void;
}

export default function TaskDialog({ addTask }: TaskDialogProps) {
    const [open, setOpen] = useState(false);

    const [task, setTask] = useState<Omit<Task, "id">>({
        title: "",
        description: "",
        priority: "Medium",
        status: "To Do",
        assignee: "",
        project: "",
        dueDate: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newTask: Task = {
            id: crypto.randomUUID(),
            ...task,
        };

        addTask(newTask);

        resetTask();
        setOpen(false);
    };

    const hasChanges =
        task.title.trim() !== "" ||
        task.description.trim() !== "" ||
        task.assignee.trim() !== "" ||
        task.project.trim() !== "" ||
        task.dueDate.trim() !== "";

    const resetTask = () => {
        setTask({
            title: "",
            description: "",
            priority: "Medium",
            status: "To Do",
            assignee: "",
            project: "",
            dueDate: "",
        });
        };
  
    return (
            <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                // Only allow opening from the button.
                // Ignore attempts to close by clicking outside.
                if (!nextOpen && hasChanges) return;

                setOpen(nextOpen);
            }}
            >            
            <DialogTrigger>
                <Button>+ New Task</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                        Fill out the details below to add a new task to your workspace.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            placeholder="Implement authentication..."
                            value={task.title ?? ""}
                            required
                            onChange={(e) => setTask({ ...task, title: e.target.value })}
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                            placeholder="Describe the task..."
                            rows={3}
                            value={task.description ?? ""}
                            onChange={(e) => setTask({ ...task, description: e.target.value })}
                        />
                    </div>

                    {/* 2-Column Grid for Metadata */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Status */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <Select 
                                value={task.status ?? "To Do"} 
                                onValueChange={(value) => {
                                if (value === null) return;

                                setTask({
                                    ...task,
                                    status: value,
                                });
                            }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="To Do">To Do</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Review">Review</SelectItem>
                                    <SelectItem value="Done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Priority */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Priority</label>
                            <Select 
                                value={task.priority ?? "Medium"} 
                                onValueChange={(value) => {
                                    if (value === null) return;

                                    setTask({
                                        ...task,
                                        priority: value,
                                    });
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Project */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Project</label>
                            <Input
                                placeholder="e.g., Q3 Roadmap"
                                value={task.project ?? ""}
                                onChange={(e) => setTask({ ...task, project: e.target.value })}
                            />
                        </div>

                        {/* Assignee */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Assignee</label>
                            <Input
                                placeholder="e.g., John Doe"
                                value={task.assignee ?? ""}
                                onChange={(e) => setTask({ ...task, assignee: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Due Date */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Due Date</label>
                        <Input
                            type="date"
                            value={task.dueDate ?? ""}
                            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                        />
                    </div>

                    {/* Dialog Actions */}
                    <DialogFooter className="pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => { resetTask(); setOpen(false); }}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Create Task
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}