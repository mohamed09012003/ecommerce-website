"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function Shell({ children }) {
  const pathname = usePathname();
  const hideSidebar = pathname === "/login";

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {!hideSidebar && <Sidebar />}
      <div className="flex-1">{children}</div>
    </div>
  );
}
