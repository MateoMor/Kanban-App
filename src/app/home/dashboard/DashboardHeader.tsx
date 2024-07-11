"use client";

import Link from "next/link";

function DashboardHeader() {
  return (
    <header className="flex items-center justify-between">
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
    </header>
  );
}

export default DashboardHeader;
