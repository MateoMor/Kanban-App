"use client"
import { logout } from "@/api/calls";
import {
  KanbanIcon,
  LayoutDashboardIcon,
  LogInIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Importa useRouter

function SideBar() {
  const router = useRouter(); // Inicializa useRouter

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login'); // Redirige a la página de login después de cerrar sesión
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <aside className="w-64 bg-white border-r">
      <nav className="flex flex-col p-4 space-y-2">
        <Link
          href="/home/dashboard"
          className="flex items-center space-x-2 text-gray-700"
          prefetch={false}
        >
          <LayoutDashboardIcon className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/home/profile"
          className="flex items-center space-x-2 text-gray-700"
          prefetch={false}
        >
          <UsersIcon className="w-5 h-5" />
          <span>Profile</span>
        </Link>
        
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-gray-700"
        >
          <LogInIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}

export default SideBar;
