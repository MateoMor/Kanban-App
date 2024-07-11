"use client";

import DashboardHeader from "@/app/home/dashboard/DashboardHeader";
import TaskCard from "@/components/tasks/TaskCard";
import CreateTaskModal from "@/components/tasks/CreateTaskModal";
import EditTaskModal from "@/components/tasks/EditTaskModal"; // Importar el modal de edición
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Page() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [tasks, setTasks] = useState<{ id: string; title: string; description: string }[]>([]);
  
  const handleCreateTask = (newTask: { title: string; description: string }) => {
    const taskWithId = { ...newTask, id: Date.now().toString() };
    setTasks([...tasks, taskWithId]);
    setIsCreateModalOpen(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEditTask = (taskId: string, updatedTask: { title: string; description: string }) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, ...updatedTask } : task));
  };

  return (
    <main className="flex-1 p-8">
      <DashboardHeader />
      <div className="flex items-center justify-between mt-8">
        <Button variant="outline" onClick={() => setIsCreateModalOpen(true)}>
          + Add New Task
        </Button>
      </div>
      <div className="flex mt-8 space-x-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} />
        ))}
      </div>

      <CreateTaskModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onCreateTask={handleCreateTask} />
    </main>
  );
}

export default Page;
