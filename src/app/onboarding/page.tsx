// app/onboarding/page.tsx
import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CompanyDetailsForm from "./components/company-details-form";

export default async function Onboarding() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  if (session.user.role === "ADMIN" && session.user.onBoarded) {
    redirect("/admin");
  }

  if (session.user.role === "USER") {
    redirect("/employee");
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Card className="w-full max-w-5xl p-6 space-y-6 shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">
            Welcome to the Onboarding Process
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Complete your profile by adding your company details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyDetailsForm
          />
        </CardContent>
      </Card>
    </div>
  );
}