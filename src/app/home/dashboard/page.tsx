"use client";

import CreateSectionModal from "@/components/createSectionModal";
import DashboardHeader from "@/components/DashboardHeader";
import TaskCard from "@/components/TaskCard";
import CreateTaskModal from "@/components/CreateTaskModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SectionColumn from "@/components/SectionColumn";

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<
    { id: string; title: string; description: string }[]
  >([]);

  const [sections, setSections] = useState<{ id: string; title: string }[]>([]);

  const handleCreateTask = (newTask: {
    title: string;
    description: string;
  }) => {
    const taskWithId = { ...newTask, id: Date.now().toString() };
    setTasks([...tasks, taskWithId]);
    setIsModalOpen(false);
  };

  const handleCreateSection = (newTask: { title: string }) => {
    const sectionWithId = { ...newTask, id: Date.now().toString() };
    setSections([...sections, sectionWithId]);
    setIsModalOpen(false);
  };

  return (
    <main className="flex-1 p-8">
      <DashboardHeader />
      <div className="flex items-center justify-between mt-8">
        <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          + Add New Section
        </Button>
      </div>

      <div className="flex mt-8 space-x-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <CreateSectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateSection={handleCreateSection}
      />

      <div className="flex mt-8 space-x-4">
        {sections.map((section) => (
          <SectionColumn key={section.id} section={section} />
        ))}
      </div>
    </main>
  );
}

export default Page;
