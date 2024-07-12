"use client";

import DashboardHeader from "@/app/home/dashboard/DashboardHeader";
import TaskCard from "@/components/tasks/TaskCard";
import CreateTaskModal from "@/components/tasks/CreateTaskModal";
import EditTaskModal from "@/components/tasks/EditTaskModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type TaskBase = {
  title: string;
  description: string;
};

type Task = TaskBase & {
  id: string;
};

function Page() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tasks, setTasks] = useState<
    { id: string; title: string; description: string }[]
  >([]);
  const [taskToEdit, setTaskToEdit] = useState<{
    id: string;
    title: string;
    description: string;
  } | null>(null);

  const handleCreateTask = (newTask: TaskBase) => {
    const taskWithId: Task = { ...newTask, id: Date.now().toString() };
    setTasks([...tasks, taskWithId]);
    setIsCreateModalOpen(false);
  };

  const handleEditTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setIsEditModalOpen(false);
    setTaskToEdit(null);
  };

  const handleEditClick = (task: Task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
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
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEditClick}
              onDelete={handleDeleteTask}
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
          onEditTask={handleEditTask}
          task={taskToEdit}
        />
      )}
    </>
  );
}

export default Page;
