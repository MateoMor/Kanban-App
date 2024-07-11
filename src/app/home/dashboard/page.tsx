"use client";

import DashboardHeader from "@/app/home/dashboard/DashboardHeader";
import TaskCard from "@/components/tasks/TaskCard";
import CreateTaskModal from "@/components/tasks/CreateTaskModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<{ id: string; title: string; description: string }[]>([]);

  const handleCreateTask = (newTask: { title: string; description: string }) => {
    const taskWithId = { ...newTask, id: Date.now().toString() };
    setTasks([...tasks, taskWithId]);
    setIsModalOpen(false);
  };

  return (
    <main className="flex-1 p-8">
      <DashboardHeader />
      <div className="flex items-center justify-between mt-8">
        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          + Add New Task
        </Button>
      </div>
      <div className="flex mt-8 space-x-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreateTask={handleCreateTask} />
    </main>
  );
}

export default Page;
