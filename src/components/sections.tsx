"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SectionsProps {}
interface Section {
  id: number;
  title: string;
}

const Sections: React.FC<SectionsProps> = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [columnTitle, setColumnTitle] = useState<string>("");

  const handleCreateColumn = () => {
    const newSection = { id: sections.length, title: columnTitle };
    setSections([...sections, newSection]);
    setIsModalOpen(false);
    setColumnTitle("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {sections.map((section) => (
        
        <div key= {section.id} className="bg-card rounded-lg p-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">{section.title}</h3>
          <Button variant="outline" size="sm">
            <PlusIcon className="w-4 h-4 m-2" />
          </Button>
        </div>
        <div className="space-y-4">
          <Card className="bg-muted p-4 rounded-md shadow-sm">
            <CardHeader>
              <CardTitle>Design new homepage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create a new homepage design with a modern and clean look.
              </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">John Doe</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Design</Badge>
                <Badge variant="outline">High Priority</Badge>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      ))}
      
        
      <div className="bg-card rounded-lg p-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Create New Column </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Column
          </Button>
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Create New Column</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="column-title">Column Title</Label>
              <Input
                id="column-title"
                placeholder="Enter column title"
                value={columnTitle}
                onChange={(e) => setColumnTitle(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateColumn}>Create Column</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface PlusIconProps extends React.SVGProps<SVGSVGElement> {}

const PlusIcon: React.FC<PlusIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
};

interface XIconProps extends React.SVGProps<SVGSVGElement> {}

const XIcon: React.FC<XIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
};

export default Sections;
