"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronRight, LogOut } from "lucide-react";
import { Notifications } from "./notifications";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const pathSegments = pathname?.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className=" flex h-16 items-center justify-between px-4 md:px-6 ">
        <nav className="flex items-center space-x-2">
          <SidebarTrigger className="h-8 w-8" />
          <Link href="/admin" className="text-sm font-medium">
            Home
          </Link>
          {(pathSegments ?? []).map((segment, index) => (
            <React.Fragment key={segment}>
              <span className="text-muted-foreground"><ChevronRight size={20} /></span>
              <Link
                href={`/${(pathSegments ?? []).slice(0, index + 1).join("/")}`}
                className="text-sm font-medium hover:underline"
              >
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </Link>
            </React.Fragment>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Notifications />
          {/* <ThemeToggle /> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={ ""}
                    alt={""}
                  />
                  <AvatarFallback>
                    {"AN"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                   Amrit Niure
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    amrit@gmail.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/employer/profile/company-profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/employer/profile/edit-company-profile/">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={async () => {
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/signin"); 
                    },
                  },
                });
              }}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
