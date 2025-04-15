"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  Clock,
  CreditCard,
  FileText,
 LayoutDashboard,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function EmployeeAppSidebar({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  const routes = [
    {
      title: "Dashboard",
      href: "/employee",
      icon: LayoutDashboard,
    },
    {
      title: "Leave",
      href: "/employee/leave",
      icon: CalendarDays,
    },
    {
      title: "Payslips",
      href: "/employee/payslips",
      icon: CreditCard,
    },
    {
      title: "Attendance",
      href: "/employee/clock-in-out",
      icon: Clock,
    },
    {
      title: "Bank Details",
      href: "/employee/bank-details",
      icon: Clock,
    },
    {
      title: "Documents",
      href: "/employee/documents",
      icon: FileText,
    },
  ];

  return (
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                  <div className="flex  items-center justify-center rounded-lg  text-primary-foreground">
                  <Image
                  width={32}
                  height={32}
                  src="/placeholder.png"
                  alt="Logo"
                  className="h-8 w-8"
                  />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Hoo-man</span>
                    <span className="truncate text-xs">Group 8</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent
          className={cn("flex flex-col space-y-1 py-4", className)}
          {...props}
        >
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {routes.map((item) => {
                const isActive =
                  pathname === item.href 
                return (
                  <Collapsible key={item.title} asChild defaultOpen={isActive} >
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <CollapsibleTrigger asChild>
                          <Link
                            href={item.href}
                            className={`rounded-sm my-1 py-5 ${
                              isActive
                                ? "bg-primary text-background"
                                : " hover:bg-muted"
                            } peer-data-[active=true]/bg:black`}
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </CollapsibleTrigger>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
  );
}
