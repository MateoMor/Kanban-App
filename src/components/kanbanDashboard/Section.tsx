import React from "react";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/kanbanDashboard/CreateTaskModal";
import PlusIcon from "./plusIcon";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface SectionProps {
  section: {
    id: number;
    title: string;
    tasks: Task[];
  };
  onAddTask: (sectionId: number) => void;
  onDeleteTask: (sectionId: number, taskId: string) => void;
  onEditTask: (sectionId: number, taskId: string, updatedTask: { title: string; description: string }) => void;
}

const Section: React.FC<SectionProps> = ({ section, onAddTask, onDeleteTask, onEditTask }) => {
  return (
    <div className="bg-card rounded-lg p-4 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">{section.title}</h3>
        <Button variant="outline" size="sm" onClick={() => onAddTask(section.id)}>
          <PlusIcon className="w-4 h-4 m-2" />
        </Button>
      </div>
      <div className="space-y-4">
        {section.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDeleteTask={(taskId) => onDeleteTask(section.id, taskId)}
            onEditTask={(taskId, updatedTask) => onEditTask(section.id, taskId, updatedTask)}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;
