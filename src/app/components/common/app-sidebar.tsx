"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  Clock,
  CreditCard,
  DollarSign,
  FileText,
 LayoutDashboard,
  Users,
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

export function AppSidebar({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  const routes = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
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
      href: "/admin/new/payroll",
      icon: CreditCard,
    },
    {
      title: "Team Attendance",
      href: "/admin/attendance/team",
      icon: Clock,
    },
    // {
    //   title: "Recruitment",
    //   href: "#",
    //   icon: Briefcase,
    //   children: [
    //     {
    //       title: "Job Postings",
    //       href: "/admin/recruitment/jobs",
    //     },
    //     {
    //       title: "Applications",
    //       href: "/admin/recruitment/applications",
    //     },
    //     {
    //       title: "Onboarding",
    //       href: "/admin/recruitment/onboarding",
    //     },
    //   ],
    // },
    {
      title: "Documents",
      href: "/admin/documents",
      icon: FileText,
    },
    {
      title: "Upgrade Plan",
      href: "/#pricing",
      icon: DollarSign,
    },
    // {
    //   title: "Reports",
    //   href: "/admin/reports",
    //   icon: BarChart3,
    // },
    // {
    //   title: "Compliance",
    //   href: "/admin/compliance",
    //   icon: FileCheck,
    // },
    // {
    //   title: "Settings",
    //   href: "/admin/settings",
    //   icon: Settings,
    // },
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
                      {/* {item.children?.length ? (
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
                      ) : null} */}
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
