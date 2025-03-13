import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignOut from "./components/sign-out";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-4 flex-col">
      <div className="flex gap-4">
        <form>
          <button
            className="px-4 py-2 rounded-sm bg-slate-100 text-sm  cursor-pointer hover:bg-slate-200"
            onClick={async () => {
              "use server";
              await auth.api.signUpEmail({
                body: {
                  email: "email@gmail.com",
                  password: "password12345",
                  name: "Amrit Niure",
                },
                asResponse: true,
              });
            }}
          >
            Sign Up
          </button>
        </form>
        <form>
          <button
            className="px-4 py-2 rounded-sm bg-slate-800 text-sm text-white cursor-pointer hover:bg-slate-800/90"
            onClick={async () => {
              "use server";
              const res = await auth.api.signInEmail({
                body: {
                  email: "email@gmail.com",
                  password: "password12345",
                },
                asResponse: true,
              });
              if (res.ok) {
                redirect("/dashboard");
              }
            }}
          >
            Sign In
          </button>
        </form>
      </div>
      <div>
        <Link
          href={"/dashboard"}
          className="px-4 py-2 rounded-sm hover:bg-neutral-50 bg-white text-sm  cursor-pointer border-2 border-slate-200"
        >
          {" "}
          Dashboard
        </Link>{" "}
      </div>
      <div>
        <SignOut />
      </div>
    </div>
  );
}
