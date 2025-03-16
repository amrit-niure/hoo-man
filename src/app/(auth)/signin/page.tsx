import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  ArrowLeft,
  UserSearch,
} from "lucide-react";
import LoginLeftPanel from "@/components/login-leftg-panel";
import SignInForm from "../admin/components/sigin-form";

export default function ProviderSignIn() {
  return (
    <div className="h-screen w-full">
      <div className="flex min-h-screen md:h-full flex-col-reverse md:flex-row">
        <LoginLeftPanel />
        <div className="flex-1 h-full relative py-20 md:py-10 flex flex-col gap-8">
          <div className="flex justify-between w-full px-10   ">
            <Button variant={"secondary"}>
              <a href="../" className="flex items-center justify-center gap-2">
                <ArrowLeft /> Back
              </a>
            </Button>
          </div>
          <div className="flex flex-col h-full items-center justify-center space-y-4">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
               Sign In
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to sign in to your account.
              </p>
            </div>
            <SignInForm />
            <div className="text-center text-sm mt-4 flex flex-col items-center space-y-2">
              <span className="text-muted-foreground">
                Are you an employer without an account?{" "}
              </span>
              <Link
                href="/admin/signup"
                className={
                  buttonVariants({ variant: "link" }) +
                  "!text-blue-600 hover:underline"
                }
              >
                Sign up here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
