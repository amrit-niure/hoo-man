import React from "react";

export default function LoginLeftPanel() {
  return (
    <div className="flex-1 h-full bg-muted p-10 dark:border-r lg:flex flex-col justify-center items-center text-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="relative z-10 flex flex-col items-center space-y-4 mb-8">
        <div className="size-12 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-xl font-bold">
          H
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to Hoo-man
        </h1>
        <p className="text-muted-foreground max-w-sm">
          Streamline your HR processes with our all-in-one solution for employee
          management, payroll, attendance tracking, and more.
        </p>
      </div>
    </div>
  );
}
