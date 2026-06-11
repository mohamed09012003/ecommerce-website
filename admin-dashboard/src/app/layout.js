import DashboardGuard from "@/components/DashboardGuard";
import Shell from "@/components/Shell";
import "./globals.css";

export const metadata = {
  title: "Admin Dashboard | Ecommerce",
  description: "Admin dashboard for ecommerce product, order, and inventory management.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body>
        <DashboardGuard>
          <Shell>{children}</Shell>
        </DashboardGuard>
      </body>
    </html>
  );
}
