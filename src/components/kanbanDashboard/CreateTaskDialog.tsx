import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  newTaskTitle: string;
  newTaskDescription: string;
  onTaskTitleChange: (title: string) => void;
  onTaskDescriptionChange: (description: string) => void;
  onCreateTask: () => void;
}

const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({
  isOpen,
  onClose,
  newTaskTitle,
  newTaskDescription,
  onTaskTitleChange,
  onTaskDescriptionChange,
  onCreateTask
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="task-title">Task Title</Label>
            <Input
              id="task-title"
              placeholder="Enter task title"
              value={newTaskTitle}
              onChange={(e) => onTaskTitleChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="task-description">Task Description</Label>
            <Input
              id="task-description"
              placeholder="Enter task description"
              value={newTaskDescription}
              onChange={(e) => onTaskDescriptionChange(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onCreateTask}>Create Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
