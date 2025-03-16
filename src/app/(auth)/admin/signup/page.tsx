import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserSearch } from "lucide-react";
import ProviderSignUpForm from "../components/provider-signup-form";

export default function ProviderSignUp() {
  return (
    <div className="h-screen w-full">
      <div className="flex h-full">
        <div className="flex-1 hidden h-full bg-muted p-10  dark:border-r lg:flex">
          <div className="flex items-center text-lg font-medium">Group 8 HRM</div>
        </div>
        <div className="flex-1 h-full relative">
          <div className=" absolute top-20 flex justify-between  w-full px-10 md:px-20">
          <Button variant={"secondary"}>
              <a href="../" className="flex items-center justify-center gap-2"><ArrowLeft/> Back</a>
            </Button>
            <Button variant={"outline"}>
              <a href="/signin" className="flex items-center justify-center gap-2"> <UserSearch />Employee</a>
            </Button>
          </div>
          <div className="flex flex-col h-full items-center justify-center space-y-4 ">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Employer - Sign Up
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to sign in to your account.
              </p>
            </div>
           <ProviderSignUpForm />
            <div className="text-center text-sm mt-4">
              <span className="text-muted-foreground">
                Dont have an employer account?{" "}
              </span>
              <Link
                href="/admin/signup"
                className="text-blue-600 hover:underline"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
