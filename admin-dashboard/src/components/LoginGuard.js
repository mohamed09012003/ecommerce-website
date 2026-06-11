"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginGuard({ children }) {
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("adminLoggedIn") === "true";
    if (!loggedIn) {
      router.replace("/login");
      return;
    }
    setAllowed(true);
  }, [router]);

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}
