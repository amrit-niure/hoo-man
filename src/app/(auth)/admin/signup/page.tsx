import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProviderSignUpForm from "../components/provider-signup-form";
import LoginLeftPanel from "@/components/login-leftg-panel";

export default function ProviderSignUp() {
  return (
    <div className="h-screen w-full">
      <div className="flex min-h-screen md:h-full flex-col-reverse md:flex-row">
        <LoginLeftPanel />
        <div className="flex-1 h-full relative py-20 md:py-10 flex flex-col gap-8">
          <div className="flex justify-between w-full px-10  ">
            <Button variant={"secondary"}>
              <a href="../" className="flex items-center justify-center gap-2">
                <ArrowLeft /> Back
              </a>
            </Button>
          
          </div>
          <div className="flex flex-col h-full items-center justify-center space-y-4">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign up
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to sign up.
              </p>
            </div>
            <ProviderSignUpForm />
            <div className="text-center text-sm mt-4 flex flex-col items-center space-y-2">
              <span className="text-muted-foreground">
                Enjoy the headache free management of your employees.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
