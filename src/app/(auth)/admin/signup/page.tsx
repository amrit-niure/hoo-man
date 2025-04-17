import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProviderSignUpForm from "../components/provider-signup-form";
import LoginLeftPanel from "@/components/login-leftg-panel";
import Link from "next/link";

export default function ProviderSignUp() {
  return (
    <div className="h-screen w-full">
      <div className="flex min-h-screen md:h-full flex-col-reverse md:flex-row">
        <LoginLeftPanel />
        <div className="flex-1 h-full relative pt-20 md:pt-10 flex flex-col gap-8">
          <div className="flex justify-between w-full px-10  ">
            <Button variant={"secondary"}>
              <a href="../" className="flex items-center justify-center gap-2">
                <ArrowLeft /> Back
              </a>
            </Button>
          </div>
          <div className="flex flex-col h-full items-center justify-center space-y-4">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to sign up.
              </p>
            </div>
            <ProviderSignUpForm />
            <div className="text-center text-sm mt-4">
              <Link
                href="/signin"
                className="text-blue-500 hover:underline"
              >
                Sign In
              </Link>
            </div>
            <div className="text-center text-sm mt-4 flex flex-col items-center space-y-2">
              <span className="text-muted-foreground">
                By signing up, you agree to our{" "}
              </span>
              <div className="flex space-x-2">
                <a
                  href="/terms-of-service"
                  className="text-blue-500 hover:underline"
                >
                  Terms of Service
                </a>
                <span>|</span>
                <a
                  href="/privacy-policy"
                  className="text-blue-500 hover:underline"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
