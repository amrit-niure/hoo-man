import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import React from 'react'
import { TopNav } from '../admin/components/top-nav'
import { EmployeeAppSidebar } from '@/app/components/common/app-sidebar-employee'

export default function EmployeeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <SidebarProvider>
    <EmployeeAppSidebar/>
    <SidebarInset>
      <TopNav />
      <main className="p-8">{children}</main>
    </SidebarInset>
  </SidebarProvider>
  )
}
