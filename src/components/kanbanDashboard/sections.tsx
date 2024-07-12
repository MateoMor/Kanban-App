import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TaskCard from "@/components/kanbanDashboard/CreateTaskModal";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Section {
  id: number;
  title: string;
  tasks: Task[];
}

const Sections: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [columnTitle, setColumnTitle] = useState<string>("");
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] =
    useState<boolean>(false);
  const [currentSectionId, setCurrentSectionId] = useState<number | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");

  const handleCreateColumn = () => {
    const newSection = { id: sections.length, title: columnTitle, tasks: [] };
    setSections([...sections, newSection]);
    setIsModalOpen(false);
    setColumnTitle("");
  };

  const handleCreateTask = () => {
    if (currentSectionId !== null) {
      const newTask = {
        id: Date.now().toString(),
        title: newTaskTitle,
        description: newTaskDescription,
      };
      setSections(
        sections.map((section) =>
          section.id === currentSectionId
            ? { ...section, tasks: [...section.tasks, newTask] }
            : section
        )
      );
      setIsCreateTaskModalOpen(false);
      setNewTaskTitle("");
      setNewTaskDescription("");
    }
  };

  const handleDeleteTask = (sectionId: number, taskId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.filter((task) => task.id !== taskId),
            }
          : section
      )
    );
  };

  const handleEditTask = (
    sectionId: number,
    taskId: string,
    updatedTask: { title: string; description: string }
  ) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updatedTask } : task
              ),
            }
          : section
      )
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {sections.map((section) => (
        <div key={section.id} className="bg-card rounded-lg p-4 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">{section.title}</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentSectionId(section.id);
                setIsCreateTaskModalOpen(true);
              }}
            >
              <PlusIcon className="w-4 h-4 m-2" />
            </Button>
          </div>
          <div className="space-y-4">
            {section.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDeleteTask={(taskId) => handleDeleteTask(section.id, taskId)}
                onEditTask={(taskId, updatedTask) =>
                  handleEditTask(section.id, taskId, updatedTask)
                }
              />
            ))}
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
      <Dialog
        open={isCreateTaskModalOpen}
        onOpenChange={setIsCreateTaskModalOpen}
      >
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
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-description">Task Description</Label>
              <Input
                id="task-description"
                placeholder="Enter task description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateTaskModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateTask}>Create Task</Button>
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

export default Sections;
