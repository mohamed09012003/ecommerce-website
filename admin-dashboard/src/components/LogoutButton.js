"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    window.localStorage.removeItem("adminLoggedIn");
    router.push("/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex h-12 items-center justify-center rounded-2xl bg-red-50 px-5 text-sm font-semibold text-red-600 transition hover:bg-red-100 border border-red-200"
    >
      🚪 Logout
    </button>
  );
}
