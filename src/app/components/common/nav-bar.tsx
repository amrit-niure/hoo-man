import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import {
  Briefcase,
  Building2,
  ChevronDown,
  Flag,
  LayoutDashboard,
  LogIn,
  Wallet,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";
import { cn } from "@/lib/utils";

import { IconStack } from "@tabler/icons-react";
import { ThemeSwitch } from "./theme-switch";
import { ProfileDropdown } from "./profile-dropdown";
import NavTitle from "./nav-title";
import LogOutForm from "./log-out-form";
import { Icons } from "../icons/svgs";

export async function Navbar() {
  const session = {
    user: {
        role: "USER",
        email: "email@gmail.com",
        name: "Amrit Niure",
        image: "",
    }
  }
  return (
    <nav className="flex justify-between items-center py-4 w-full z-10 max-w-7xl mx-auto px-4">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Home"
            width="70"
            height="32"
            className="min-w-8"
          />
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              {session?.user?.role !== "USER" && (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/post-job"
                    className={navigationMenuTriggerStyle() + " gap-2"}
                  >
                    <Flag size={18} strokeWidth={1} />
                    Post Job
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/find-jobs"
                  className={navigationMenuTriggerStyle() + " gap-2"}
                >
                  <Briefcase size={18} strokeWidth={1} />
                  Find Jobs
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/find-companies"
                  className={navigationMenuTriggerStyle() + " gap-2"}
                >
                  <Building2 size={18} strokeWidth={1} />
                  Find Companies
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/pricing"
                  className={navigationMenuTriggerStyle() + " gap-2"}
                >
                  <Wallet size={18} strokeWidth={1} />
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-2 gap-2">
                  <IconStack strokeWidth={1} />
                  Use Cases
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] z-50">
                    <ListItem href="/post-job" title="Labor Market Test">
                      Post jobs for labor market test.
                    </ListItem>
                    <ListItem href="/fast-hiring" title="Fast Hiring">
                      Hire the best talent quickly.
                    </ListItem>
                    <ListItem
                      href="/international-hiring"
                      title="International Hiring"
                    >
                      Hire from anywhere in the world.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center gap-5">
        <ThemeSwitch />
        {session?.user?.role !== "USER" && (
          <Link
            href="/post-job"
            className={buttonVariants({ variant: "default" })}
          >
            Post Job
          </Link>
        )}
        {session ? (
          session.user.role === "PROVIDER" ? (
            <Link
              href="/dashboard/provider"
              className={buttonVariants({ variant: "outline" }) + "flex gap-2"}
            >
              <LayoutDashboard  size={18} />
              Go to Dashboard
            </Link>
          ) : session.user.role === "USER" ? (
            <ProfileDropdown
              email={session.user.email as string}
              name={session.user.name as string}
              image={session.user.image as string}
            />
          ) : null
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline" }) + ""}
          >
            Login
          </Link>
        )}
         {session?.user.role === "SUPERADMIN" && (
            <Link
              href="/dashboard/admin"
              className={buttonVariants({ variant: "outline" }) + "flex gap-2"}
            >
              <LayoutDashboard  size={18} />
              Admin Dashbaord
            </Link>
          ) }
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-4">
        <ThemeSwitch />
        {session?.user?.role !== "USER" && (
          <Link
            href="/post-job"
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            Post Job
          </Link>
        )}
           {session ? (
          session.user.role === "PROVIDER" ? (
            <Link
              href="/dashboard/provider"
              className={buttonVariants({ variant: "outline" }) + "flex gap-2"}
            >
              <LayoutDashboard  size={18} />
            Dashboard
            </Link>
          ) : session.user.role === "USER" ? (
            <ProfileDropdown
              email={session.user.email as string}
              name={session.user.name as string}
              image={session.user.image as string}
            />
          ) : null
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline" }) + ""}
          >
            Login
          </Link>
        )}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
            <Icons.hamburger className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="text-left">
              <SheetTitle>
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/logo.png"
                    alt="Home"
                    width="70"
                    height="32"
                    className="min-w-8"
                  />
                </div>
              </SheetTitle>
              <SheetDescription>
                Find or post your next job opportunity
              </SheetDescription>
            </SheetHeader>

            {/* Navigation Menu Inside Sheet */}
            <div className="mt-4 text-sm">
              <ul className="flex flex-col gap-2">
                <li>
                  <NavTitle>Employers</NavTitle>
                </li>
                <li>
                  <Link
                    href="/post-job"
                    className="flex items-center gap-2 hover:underline  p-2 rounded-md transition-colors bg-primary text-primary-foreground"
                  >
                    <Flag
                      size={18}
                      strokeWidth={2}
                      className="text-primary-foreground"
                    />
                    Post Job
                  </Link>
                </li>
                <li>
                  <NavTitle>Job Seekers</NavTitle>
                </li>
                <li>
                  <Link
                    href="/find-jobs"
                    className="flex items-center gap-2 hover:underline hover:text-accent-foreground p-2 rounded-md transition-colors"
                  >
                    <Briefcase size={18} strokeWidth={1} />
                    Find Jobs
                  </Link>
                  <Link
                    href="/find-companies"
                    className="flex items-center gap-2 hover:underline hover:text-accent-foreground p-2 rounded-md transition-colors"
                  >
                    <Building2 size={18} strokeWidth={1} />
                    Find Companies
                  </Link>
                </li>
                <li>
                  <NavTitle>Use case</NavTitle>
                </li>
                <li>
                  <details className="group">
                    <summary className="flex items-center gap-2   hover:underline hover:text-accent-foreground p-2 rounded-md cursor-pointer transition-colors">
                      <IconStack strokeWidth={1} />
                      Use Cases
                      <ChevronDown strokeWidth={1} />
                    </summary>
                    <ul className="ml-4 mt-2 space-y-2">
                      <ListItem href="/post-job" title="Labor Market Test">
                        Post jobs for labor market test.
                      </ListItem>
                      <ListItem href="/fast-hiring" title="Fast Hiring">
                        Hire the best talent quickly.
                      </ListItem>
                      <ListItem
                        href="/international-hiring"
                        title="International Hiring"
                      >
                        Hire from anywhere in the world.
                      </ListItem>
                    </ul>
                  </details>
                </li>

                <li>
                  <NavTitle>Premium posting</NavTitle>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="flex items-center gap-2 hover:underline hover:text-accent-foreground p-2 rounded-md transition-colors"
                  >
                    <Wallet size={18} strokeWidth={1} />
                    Pricing
                  </Link>
                </li>
                <li>
                  <NavTitle>Account</NavTitle>
                </li>

                {session?.user ? (
                  <li>
                    <div
                      className={
                        buttonVariants({ variant: "outline" }) + " w-full"
                      }
                    >
                      <LogOutForm />
                    </div>
                  </li>
                ) : (
                  <Link
                    href="/login"
                    className={
                      buttonVariants({ variant: "default" }) +
                      " flex gap-2 items-center justify-center"
                    }
                  >
                    <LogIn size={18} strokeWidth={1} />
                    Login
                  </Link>
                )}
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { illustration?: string }
>(({ className, title, children, illustration, ...props }, ref) => {
  return (
    <li>
      <Link
        href={props.href as string}
        ref={ref}
        className={cn(
          "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
          className
        )}
        {...props}
      >
        {illustration && (
          <div className="mb-2">
            <Image
              src={illustration}
              alt={title || ""}
              className="w-full h-24 object-cover rounded-md"
            />
          </div>
        )}
        <div className="text-sm  leading-none">{title}</div>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
          {children}
        </p>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";