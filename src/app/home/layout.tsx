import SideBar from "@/components/SideBar";
import ThemeButton from "@/components/buttons/ThemeButton";
import UserButton from "@/components/buttons/UserButton";
import Link from "next/link";

 function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <header className="bg-white border-b p-4">
        <div className="flex items-center justify-between">
          <Link className="text-2xl font-bold" href="/home">ELITE KANBAN</Link>
          <div className="flex items-center space-x-4">
            <ThemeButton />
            <UserButton />
          </div>
        </div>
      </header>
      <div className="flex h-full">
        <SideBar /> {/* The dashboard's sidebar */}
        {children}
      </div>
    </div>
  );
}

export default Layout;