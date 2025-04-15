
import { LogOut } from "lucide-react";
import React from "react";

export default function LogOutForm() {
  return (
    <form
    >
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
  );
}