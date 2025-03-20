
import { Button } from "@/components/ui/button";
import { getSessionData } from "@/lib/get-session-data";
import Link from "next/link";
import React from "react";
export default async function Client() {
  const { user } = await getSessionData();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <span className="text-center">
        Welcome,<span className="font-bold"> {user.name}</span> <br /> You have
        been added as a employee.
      </span>
      <Button>We are working on this section</Button>
      <Link href="/">
        <Button variant="outline">Go to HomePage</Button>
      </Link>
      {/* <LogOut /> */}
    </div>
  );
}
