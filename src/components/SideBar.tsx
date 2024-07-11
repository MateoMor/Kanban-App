import {
  KanbanIcon,
  LayoutDashboardIcon,
  LogInIcon,
  UserIcon,
  UsersIcon,
  WebcamIcon,
} from "lucide-react";
import Link from "next/link";

function SideBar() {
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
        <Link
          href="/axios/logout"
          className="flex items-center space-x-2 text-gray-700"
          prefetch={false}
        >
          <LogInIcon className="w-5 h-5" />
          <span>Logout</span>
        </Link>
      </nav>
    </aside>
  );
}

export default SideBar;
