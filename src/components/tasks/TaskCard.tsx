import React from 'react';
import { GripVertical, Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <Card className="w-60">
      <CardHeader className="flex flex-row items-center justify-between p-2 gap-6">
        <div className="flex flex-row items-center">
          <Button variant="ghost" className="p-1 hover:cursor-grab">
            <GripVertical className="h-4 w-4" />
          </Button>
          <CardTitle className="break-words">{task.title}</CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onEdit(task)}>
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(task.id)}>
              <span className="text-red-500">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="h-40 bg-muted overflow-auto p-2">
        <p className="break-words">{task.description}</p>
      </CardContent>
    </Card>
  );
}

export default TaskCard;
