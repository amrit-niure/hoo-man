import type { Metadata } from "next";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TopNav } from "./components/top-nav";
import { AppSidebar } from "@/app/components/common/app-sidebar";

export const metadata: Metadata = {
  title: "HR & Payroll Management System | Admin",
  description: "A comprehensive HR and payroll management solution",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
    <AppSidebar/>
    <SidebarInset>
      <TopNav />
      <main className="p-8">{children}

      </main>
    </SidebarInset>
  </SidebarProvider>
  );
}
