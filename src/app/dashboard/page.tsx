import CreateNewSectionButton from "@/components/CreateNewSectionButton";
import DashboardHeader from "@/components/DashboardHeader";
import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Page() {
  return (
    <main className="flex-1 p-8">
      <DashboardHeader />
      <div className="flex mt-8 space-x-4">
        <TaskCard /> {/* This component is the task card */}
        <CreateNewSectionButton />
      </div>
    </main>
  );
}

export default Page;
