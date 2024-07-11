import { DropletsIcon, Ellipsis, ExpandIcon, GripVertical } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// Define una interfaz para las propiedades
interface TaskCardProps {
  cardTitle: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ cardTitle }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-2 gap-6">
        <div className="flex flex-row items-center ">
          <Button variant="ghost" className="p-1 hover:cursor-grab">
            <GripVertical className="h-4 w-4" />
          </Button>
          <CardTitle>{cardTitle}</CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span>Rename</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="text-red-500">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="h-40 bg-muted" />
    </Card>
  );
}


export default TaskCard;
