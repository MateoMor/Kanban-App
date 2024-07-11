"use client";

import CreateNewSectionButton from "@/components/CreateNewSectionButton";
import DashboardHeader from "@/components/DashboardHeader";
import KanbanBoard from "@/components/KanbanBoard";
import TaskCard from "@/components/TaskCard";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { Kanban } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function DashboardPage() {
  return (
    <main className="flex-1 p-8">
      <DashboardHeader />
      <div className="flex mt-8 space-x-4">
        {/* This component is the task card */}
        {/* <DndContext collisionDetection={closestCorners}>
          <TaskCard cardTitle="Carta" />
          <TaskCard cardTitle="Carta2" />
        </DndContext> */}
        <KanbanBoard />
        <CreateNewSectionButton />
      </div>
    </main>
  );
}

export default DashboardPage;
