import React from "react";
import { GripVertical, Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Section {
  id: string;
  title: string;
}

interface SectionColumnProps {
  section: Section;
}

function SectionColumn({ section }: SectionColumnProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-2 gap-6">
        <div className="flex flex-row items-center">
          <Button variant="ghost" className="p-1 hover:cursor-grab">
            <GripVertical className="h-4 w-4" />
          </Button>
          <CardTitle>{section.title}</CardTitle>
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
      <CardContent className="h-40 bg-muted overflow-auto p-2">
        <p>CARDS CONTAINER</p>
      </CardContent>
    </Card>
  );
}

interface BoardSectionProps {
  title: string;
  sections: Section[];
}

const BoardSection: React.FC<BoardSectionProps> = ({ title, sections }) => {
  return (
    <div className="flex flex-col flex-grow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <Button variant="outline">Add Section</Button>
      </div>
      <div className="space-y-4">
        {sections.map((section) => (
          <SectionColumn key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
};

export default BoardSection;
