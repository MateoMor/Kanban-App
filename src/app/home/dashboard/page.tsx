"use client";

import DashboardHeader from "@/app/home/dashboard/DashboardHeader";
import TaskCard from "@/components/tasks/TaskCard";
import CreateTaskModal from "@/components/tasks/CreateTaskModal";
import EditTaskModal from "@/components/tasks/EditTaskModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function Page() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tasks, setTasks] = useState<{ title: string; description: string }[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<{ title: string; description: string } | null>(null);

  const handleCreateTask = (newTask: { title: string; description: string }) => {
    setTasks([...tasks, newTask]);
    setIsCreateModalOpen(false);
  };

  const handleEditTask = (updatedTask: { title: string; description: string }, index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
    setIsEditModalOpen(false);
    setTaskToEdit(null);
  };

  const handleEditClick = (task: { title: string; description: string }) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <>
      <main className="flex-1 p-8">
        <DashboardHeader />
        <div className="flex items-center justify-between mt-8">
          <Button variant="outline" onClick={() => setIsCreateModalOpen(true)}>
            + Add New Task
          </Button>
        </div>
        <div className="flex mt-8 space-x-4">
          {tasks.map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              onEdit={() => handleEditClick(task)}
              onDelete={() => handleDeleteTask(index)}
            />
          ))}
        </div>
      </main>

      {isCreateModalOpen && (
        <CreateTaskModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateTask={handleCreateTask}
        />
      )}

      {isEditModalOpen && taskToEdit && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onEditTask={(updatedTask) => handleEditTask(updatedTask, tasks.indexOf(taskToEdit))}
          task={taskToEdit}
        />
      )}
    </>
  );
}

export default Page;