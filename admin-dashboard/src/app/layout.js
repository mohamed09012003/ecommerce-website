import Sidebar from "@/components/Sidebar";
import "./globals.css";

export const metadata = {
  title: "Admin Dashboard | Ecommerce",
  description: "Admin dashboard for ecommerce product, order, and inventory management.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
