import React, { useState } from "react";
import CreateColumnDialog from "./CreateColumnDialog";
import CreateTaskDialog from "./CreateTaskDialog";
import Section from "./Section";
import PlusIcon from "./plusIcon"; 
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface SectionData {
  id: number;
  title: string;
  tasks: Task[];
}

const SectionBoard: React.FC = () => {
  const [sections, setSections] = useState<SectionData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [columnTitle, setColumnTitle] = useState<string>("");
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState<boolean>(false);
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
        <Section
          key={section.id}
          section={section}
          onAddTask={(sectionId) => {
            setCurrentSectionId(sectionId);
            setIsCreateTaskModalOpen(true);
          }}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      ))}
      <div className="bg-card rounded-lg p-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Create New Column</h2>
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
      <CreateColumnDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        columnTitle={columnTitle}
        onColumnTitleChange={setColumnTitle}
        onCreateColumn={handleCreateColumn}
      />
      <CreateTaskDialog
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        newTaskTitle={newTaskTitle}
        newTaskDescription={newTaskDescription}
        onTaskTitleChange={setNewTaskTitle}
        onTaskDescriptionChange={setNewTaskDescription}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
};

export default SectionBoard;
