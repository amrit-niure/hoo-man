import React from "react";
import SignOut from "../components/sign-out";

export default function dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      This is protected dashboard
      <div>
        <SignOut />
      </div>
    </div>
  );
}
