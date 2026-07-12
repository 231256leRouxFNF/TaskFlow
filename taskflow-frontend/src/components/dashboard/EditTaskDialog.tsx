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
import ConfirmDialog from "./ConfirnDialog";

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
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);



    useEffect(() => {
        setEditedTask(task);
    }, [task]);

    const hasChanges =
    JSON.stringify(task) !== JSON.stringify(editedTask);

    const handleSave = () => {
        updateTask(editedTask);
        setEditedTask(editedTask);
        onOpenChange(false);
    };

    const confirmSave = () => {
        updateTask(editedTask);
        setEditedTask(editedTask);
        setShowSaveConfirm(false);
        onOpenChange(false);
    };

    const confirmDelete = () => {
        deleteTask(task.id);
        setShowDeleteConfirm(false);
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

            <DialogContent className="sm:max-w-xl"
                showCloseButton={false}
                onClick={(e) => e.stopPropagation()}>

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

            <DialogFooter className="flex justify-between">

                <Button
                    variant="destructive"
                    onClick={() => {

                        if (
                            window.confirm(
                                "Are you sure you want to delete this task?\n\nThis action cannot be undone."
                            )
                        ) {

                            deleteTask(task.id);
                            onOpenChange(false);

                        }

                    }}
                >
                    Delete
                </Button>

                <div className="flex gap-2">

                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>

                <Button
                    onClick={() => {

                        if (
                            window.confirm(
                                "Save the changes made to this task?"
                            )
                        ) {

                            handleSave();

                        }

                    }}
                >
                    Save Changes
                </Button>

                </div>

            </DialogFooter>

            </DialogContent>

                <ConfirmDialog
                    open={showDeleteConfirm}
                    title="Delete Task"
                    description="This action cannot be undone."
                    confirmText="Delete Task"
                    confirmVariant="destructive"
                    onConfirm={confirmDelete}
                    onCancel={() => setShowDeleteConfirm(false)}
                />

                <ConfirmDialog
                    open={showSaveConfirm}
                    title="Save Changes?"
                    description="Save the changes made to this task?"
                    confirmText="Save Changes"
                    onConfirm={confirmSave}
                    onCancel={() => setShowSaveConfirm(false)}
                />

        </Dialog>
    );
}