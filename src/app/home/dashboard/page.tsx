"use client";

import Sections from "@/components/sections";
import DashboardHeader from "@/components/DashboardHeader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

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
      {/* <Button variant="outline" onClick={() => setIsModalOpen(true)}>
          + Add New Section
        </Button> */}
      <Sections />
    </main>
  );
}

export default Page;
