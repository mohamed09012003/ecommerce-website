"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardGuard({ children }) {
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("adminLoggedIn") === "true";
    if (!loggedIn && pathname !== "/login") {
      router.replace("/login");
      return;
    }
    if (loggedIn && pathname === "/login") {
      router.replace("/");
      return;
    }
    setAllowed(true);
  }, [pathname, router]);

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}
