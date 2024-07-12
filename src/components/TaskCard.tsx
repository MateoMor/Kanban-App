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
}

function TaskCard({ task }: TaskCardProps) {
  return (
    <Card>
      
    </Card>
  );
}

export default TaskCard;
