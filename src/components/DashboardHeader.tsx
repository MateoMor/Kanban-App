"use client";

import Link from "next/link";
import { Button } from "./ui/button";

function DashboardHeader() {
  return (
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
        <p className="text-gray-500">Manage tasks by cards</p>
      </div>
      <Button variant="outline" className="h-10">
        + Add New Todo
      </Button>
    </div>
  );
}

export default DashboardHeader;
