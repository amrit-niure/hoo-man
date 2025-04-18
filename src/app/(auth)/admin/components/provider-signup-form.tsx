"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ISignUp, signUpFormSchema } from "../validation";
import { useState } from "react";
import { CustomSpinner } from "@/app/components/common/spinner";
import { PasswordInput } from "@/app/components/ui-extension/password-input";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { sendEmailAction } from "./actions";

export default function ProviderSignUpForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<ISignUp>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "ADMIN",
      orgName: "",
    },
  });

  async function onSubmit(values: ISignUp) {
    setLoading(true);
    const data = await authClient.signUp.email(
      {
        name: values.orgName,
        email: values.email,
        password: values.password,
        role: "ADMIN",
        callbackURL: "/signin",
      },
      {
        onRequest: () => {
          toast.info("Creating account...");
        },
        onSuccess: () => {
          toast.success("Account created successfully");
          router.push("/signin");
        },
        onError: (error) => {
          toast.error(error.error.message);
        },
      }
    );
    if (data?.data?.user) {
      await sendEmailAction(data.data.user.email, data.data.user.name);
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-lg mx-auto w-full p-10"
      >
        <FormField
          control={form.control}
          name="orgName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="Intel Corporation" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="yourname@mailserver.com"
                  type="email"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="•••••••••" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <CustomSpinner className="h-4 w-4" /> : "Sign up"}
        </Button>
      </form>
    </Form>
  );
}
