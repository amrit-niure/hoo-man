"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  CalendarDays,
  Clock,
  CreditCard,
  FileText,
 LayoutDashboard,
  Settings,
  Users,
  Briefcase,
  FileCheck,
  Building,
  Command,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function AppSidebar({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  const routes = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Company",
      href: "/admin/company",
      icon: Building,
    },
    {
      title: "Employees",
      href: "/admin/employees",
      icon: Users,
    },
    {
      title: "Leave Management",
      href: "/admin/leave",
      icon: CalendarDays,
    },
    {
      title: "Payroll",
      href: "#",
      icon: CreditCard,
      children: [
        {
          title: "Overview",
          href: "/admin/payroll",
        },
        {
          title: "Payslips",
          href: "/admin/payroll/payslips",
        },
        {
          title: "Payments",
          href: "/admin/payroll/payments",
        },
      ],
    },
    {
      title: "Attendance",
      href: "#",
      icon: Clock,
      children: [
        {
          title: "Clock In/Out",
          href: "/admin/attendance/clock-in-out",
        },
        {
          title: "Team Attendance",
          href: "/admin/attendance/team",
        },
      ],
    },
    {
      title: "Recruitment",
      href: "#",
      icon: Briefcase,
      children: [
        {
          title: "Job Postings",
          href: "/admin/recruitment/jobs",
        },
        {
          title: "Applications",
          href: "/admin/recruitment/applications",
        },
        {
          title: "Onboarding",
          href: "/admin/recruitment/onboarding",
        },
      ],
    },
    {
      title: "Documents",
      href: "/admin/documents",
      icon: FileText,
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: BarChart3,
    },
    {
      title: "Compliance",
      href: "/admin/compliance",
      icon: FileCheck,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (

      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">HRM - AIH</span>
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
                  pathname === item.href || 
                  (item.children && item.children.some((child) => pathname === child.href));
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
                      {item.children?.length ? (
                        <>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuAction className="data-[state=open]:rotate-90">
                              <ChevronRight />
                              <span className="sr-only">Toggle</span>
                            </SidebarMenuAction>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.children.map((subItem) => {
                                const isActive = pathname === subItem.href;
                                return (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild>
                                      <Link
                                        href={subItem.href}
                                        className={`rounded-md py-4 ${
                                          isActive && "bg-primary/10"
                                        }`}
                                      >
                                        <span>{subItem.title}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                );
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </>
                      ) : null}
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
