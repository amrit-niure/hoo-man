"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import Link from "next/link";

interface iAppProps {
  email: string;
  name: string;
  image: string;
}
export function ProfileDropdown({ email, name, image }: iAppProps) {
const data = {
  user: {
    role: "USER",
  },
}
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        {/* <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={image} alt='@job4online' />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
        </Button> */}
        <div>
          <Button
            variant="ghost"
            className="md:hidden relative h-8 w-8 rounded-full"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="user-profile" />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
          </Button>
          <Button
            variant="outline"
            className="hidden md:flex items-center space-x-2"
          >
            <Avatar className="h-8 w-8 ">
              <AvatarImage src={image} alt="User" />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <span>{name}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
        <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback className="rounded-lg">SN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {data?.user?.role === "USER" && (
            <DropdownMenuItem asChild>
              <Link href="/dashboard">
                <LayoutDashboard /> Dashboard
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          )}
          {data?.user?.role === "PROVIDER" && (
            <DropdownMenuItem asChild>
              <Link href="/dashboard/provider">
                <LayoutDashboard /> Dashboard
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <CreditCard /> Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings /> Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form >
            <button type="submit" className="w-full flex items-center gap-2">
              <LogOut
                size={16}
                strokeWidth={2}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Logout</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
