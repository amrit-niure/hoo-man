"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignOut() {
  const router = useRouter();
  return (
    <button
      className="px-4 py-2 rounded-sm bg-slate-100 text-sm  cursor-pointer hover:bg-slate-200"
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/");
            },
          },
        });
      }}
    >
      Sign Out
    </button>
  );
}
