import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Page() {
  return (
    <main className="flex-1 p-8">
      <div className="flex items-center justify-between">
        <div>
          <nav className="text-sm text-gray-500">
            <Link href="#" className="hover:underline" prefetch={false}>
              Dashboard
            </Link>
            &gt;{" "}
            <Link href="#" className="hover:underline" prefetch={false}>
              Kanban
            </Link>
          </nav>
          <h1 className="text-2xl font-bold">Kanban</h1>
          <p className="text-gray-500">Manage tasks by dnd</p>
        </div>
        <Button variant="outline" className="h-10">
          + Add New Todo
        </Button>
      </div>
      <div className="flex mt-8 space-x-4">
        <TaskCard /> {/* This component is the task card */}
        <Button variant="outline" className="h-10">
          + Add New Section
        </Button>
      </div>
    </main>
  );
}

export default Page;
