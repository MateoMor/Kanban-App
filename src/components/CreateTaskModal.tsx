import React from "react";
import { GripVertical, Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface TaskCardProps {
  task: Task;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (
    taskId: string,
    updatedTask: { title: string; description: string }
  ) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDeleteTask,
  onEditTask,
}) => {
  return (
    <Card className="bg-muted p-4 rounded-md shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-2 gap-6">
        <div className="flex flex-row items-center">
          <Button variant="ghost" className="p-1 hover:cursor-grab">
            <GripVertical className="h-4 w-4" />
          </Button>
          <CardTitle>{task.title}</CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                onEditTask(task.id, {
                  title: "enter new title",
                  description: "enter new description",
                })
              }
            >
              <span>Rename</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDeleteTask(task.id)}>
              <span className="text-red-500">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="h-40 bg-muted overflow-auto p-2">
        <p>{task.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Username</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Pro</Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
