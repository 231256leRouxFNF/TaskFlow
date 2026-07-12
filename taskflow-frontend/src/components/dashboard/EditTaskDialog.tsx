import { useEffect, useState } from "react";

import type { Task } from "@/types/task";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

interface EditTaskDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    task: Task;

    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
}

export default function EditTaskDialog({
    open,
    onOpenChange,
    task,
    updateTask,
    deleteTask,
}: EditTaskDialogProps) {

    const [editedTask, setEditedTask] = useState(task);
    const [showSaveConfirm, setShowSaveConfirm] = useState(false);
    const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);



    useEffect(() => {
        setEditedTask(task);
    }, [task]);

    const hasChanges =
    JSON.stringify(task) !== JSON.stringify(editedTask);

    const handleSave = () => {
        setShowSaveConfirm(true);
    };

    const confirmSave = () => {
        updateTask(editedTask);

        setShowSaveConfirm(false);

        setEditedTask(editedTask);//Resets the local copy of the task so that hasChanges becomes false

        onOpenChange(false);
    };

    const removeTask = () => {
        deleteTask(task.id);
        onOpenChange(false);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (!nextOpen && hasChanges) {
                    setShowDiscardConfirm(true);
                    return;
                }

                onOpenChange(nextOpen);
            }}
        >

            <DialogContent className="sm:max-w-xl
                onClick={(e) => e.stopPropagation()}">

                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>

                    <DialogDescription>
                        Update the task information.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">

                    <Input
                        value={editedTask.title}
                        onChange={(e) =>
                            setEditedTask({
                                ...editedTask,
                                title: e.target.value,
                            })
                        }
                    />

                    <Textarea
                        rows={4}
                        value={editedTask.description}
                        onChange={(e) =>
                            setEditedTask({
                                ...editedTask,
                                description: e.target.value,
                            })
                        }
                    />

                    <div className="grid grid-cols-2 gap-4">

                        <Select
                            value={editedTask.status}
                            onValueChange={(value) =>
                                setEditedTask({
                                    ...editedTask,
                                    status: value as Task["status"],
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="To Do">To Do</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Review">Review</SelectItem>
                                <SelectItem value="Done">Done</SelectItem>
                            </SelectContent>

                        </Select>

                        <Select
                            value={editedTask.priority}
                            onValueChange={(value) =>
                                setEditedTask({
                                    ...editedTask,
                                    priority: value as Task["priority"],
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Critical">Critical</SelectItem>
                            </SelectContent>

                        </Select>

                    </div>

                </div>

                <DialogFooter className="justify-between">

                    <Button
                        variant="destructive"
                        onClick={removeTask}
                    >
                        Delete
                    </Button>

                    <Button
                        onClick={handleSave}
                    >
                        Save Changes
                    </Button>

                </DialogFooter>

            </DialogContent>

                <Dialog
                    open={showSaveConfirm}
                    onOpenChange={setShowSaveConfirm}
                >
                    <DialogContent>

                        <DialogHeader>

                            <DialogTitle>
                                Save Changes?
                            </DialogTitle>

                            <DialogDescription>
                                Do you want to save these changes?
                            </DialogDescription>

                        </DialogHeader>

                        <DialogFooter>

                            <Button
                                variant="outline"
                                onClick={() => setShowSaveConfirm(false)}
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={confirmSave}
                            >
                                Save
                            </Button>

                        </DialogFooter>

                    </DialogContent>
                </Dialog>

                <Dialog
                    open={showDiscardConfirm}
                    onOpenChange={setShowDiscardConfirm}
                >
                    <DialogContent>

                        <DialogHeader>

                            <DialogTitle>
                                Discard Changes?
                            </DialogTitle>

                            <DialogDescription>
                                You have unsaved changes.
                                Are you sure you want to discard them?
                            </DialogDescription>

                        </DialogHeader>

                        <DialogFooter>

                            <Button
                                variant="outline"
                                onClick={() => setShowDiscardConfirm(false)}
                            >
                                Continue Editing
                            </Button>

                            <Button
                                variant="destructive"
                                onClick={() => {
                                    setEditedTask(task);
                                    setShowDiscardConfirm(false);
                                    onOpenChange(false);
                                }}
                            >
                                Discard
                            </Button>

                        </DialogFooter>

                    </DialogContent>
                </Dialog>

        </Dialog>
    );
}