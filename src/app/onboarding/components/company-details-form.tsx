// components/CompanyDetailsForm.tsx
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addCompanySchema, IAddCompany } from "./validation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { createCompanyProfile } from "../actions";
import { useRouter } from "next/navigation";

const CompanyDetailsForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<IAddCompany>({
    resolver: zodResolver(addCompanySchema),
    defaultValues: {
      companyName: "",
      address: "",
      phone: "",
      email: "",
      website: "",
      taxNumber: "",
      registrationNo: "",
      description: "",
      industry: "",
      foundedDate: undefined,
    },
  });

  // Handle form submission
  const onSubmit = async (data: IAddCompany) => {
    console.log(data);
    try {
      const res = await createCompanyProfile(data);
      if (res.success) {
        toast.success("Company details added successfully!");
        if (res.redirectPath) {
          router.push(res.redirectPath);
        }
        form.reset();
      } else {
        toast.error(res.message || "Failed to add company details.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add company details. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Add Your Company Details
        </CardTitle>
        <CardDescription className="text-center">
          Provide the necessary information to complete your company profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-x-5 space-y-5">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">
                  Basic Information
                </h3>
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">
                  Contact Information
                </h3>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter company phone number"
                          {...field}
                        />
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
                        <Input placeholder="Enter company email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-x-5 space-y-5">
              {/* Optional Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">
                  Optional Details
                </h3>
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Website{" "}
                        <Tooltip>
                          <TooltipTrigger className="ml-1 text-muted-foreground hover:text-primary">
                            ⓘ
                          </TooltipTrigger>
                          <TooltipContent>
                            Enter your company's official website URL.
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://yourcompany.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="taxNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter tax number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="registrationNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter registration number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Additional Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">
                  Additional Information
                </h3>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Describe your company" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Technology, Healthcare"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="foundedDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Founded Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={
                            field.value
                              ? field.value.toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            field.onChange(new Date(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Save Company Details
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CompanyDetailsForm;
