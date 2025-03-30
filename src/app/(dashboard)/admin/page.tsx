// "use client"

// import { useState } from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { format } from "date-fns"
// import { Mail, Phone, Globe, FileText, Calendar, Briefcase, MapPin, Edit } from "lucide-react"
// import { z } from "zod"

// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent } from "@/components/ui/card"
// import { toast } from "sonner"

// // Sample company data - replace with actual data fetching
// const companyData = {
//   id: "1",
//   companyName: "Acme Corporation",
//   logo: "/placeholder.svg?height=100&width=100",
//   address: "123 Business Ave, Tech City, TC 12345",
//   phone: "+1 (555) 123-4567",
//   email: "contact@acmecorp.com",
//   website: "https://acmecorp.com",
//   taxNumber: "TAX-12345678",
//   registrationNo: "REG-87654321",
//   description: "A leading provider of innovative business solutions.",
//   industry: "Technology",
//   foundedDate: new Date("2010-05-15"),
//   createdAt: new Date("2023-01-10"),
//   updatedAt: new Date("2023-06-22"),
// }

// // Form schema
// const companySchema = z.object({
//   companyName: z.string().min(1, "Company name is required"),
//   address: z.string().min(1, "Address is required"),
//   phone: z.string().min(1, "Phone number is required"),
//   email: z.string().email("Invalid email address"),
//   website: z.string().optional(),
//   taxNumber: z.string().optional(),
//   registrationNo: z.string().optional(),
//   description: z.string().optional(),
//   industry: z.string().optional(),
//   foundedDate: z.date().optional(),
// })

// type CompanyFormValues = z.infer<typeof companySchema>

// export default function CompanyProfile() {
//   const [isDialogOpen, setIsDialogOpen] = useState(false)

//   // Update company function
//   const updateCompany = async (data: CompanyFormValues) => {
//     try {
//       // Replace with your actual update function
//       console.log("Updating company with data:", data)

//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       toast.success("Company details updated successfully!")
//       setIsDialogOpen(false)
//     } catch (error) {
//       console.error(error)
//       toast.error("Failed to update company details. Please try again.")
//     }
//   }

//   const form = useForm<CompanyFormValues>({
//     resolver: zodResolver(companySchema),
//     defaultValues: {
//       companyName: companyData.companyName,
//       address: companyData.address,
//       phone: companyData.phone,
//       email: companyData.email,
//       website: companyData.website || "",
//       taxNumber: companyData.taxNumber || "",
//       registrationNo: companyData.registrationNo || "",
//       description: companyData.description || "",
//       industry: companyData.industry || "",
//       foundedDate: companyData.foundedDate,
//     },
//   })

//   return (
//     <div className=" mx-auto space-y-8">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Company Profile</h1>
//           <p className="text-muted-foreground mt-1">View and manage your company information</p>
//         </div>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button>
//               <Edit className="mr-2 h-4 w-4" />
//               Update Company
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle>Edit Company Details</DialogTitle>
//               <DialogDescription>
//                 Make changes to your company profile here. Click save when you're done.
//               </DialogDescription>
//             </DialogHeader>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(updateCompany)} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Basic Information Section */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
//                     <FormField
//                       control={form.control}
//                       name="companyName"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Company Name</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Enter company name" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="address"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Address</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Enter company address" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>

//                   {/* Contact Information Section */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold border-b pb-2">Contact Information</h3>
//                     <FormField
//                       control={form.control}
//                       name="phone"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Phone</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Enter company phone number" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="email"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Email</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Enter company email" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Optional Details Section */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold border-b pb-2">Optional Details</h3>
//                     <FormField
//                       control={form.control}
//                       name="website"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Website</FormLabel>
//                           <FormControl>
//                             <Input placeholder="https://yourcompany.com" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="taxNumber"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Tax Number</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Enter tax number" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="registrationNo"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Registration Number</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Enter registration number" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>

//                   {/* Additional Information Section */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold border-b pb-2">Additional Information</h3>
//                     <FormField
//                       control={form.control}
//                       name="description"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Description</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Describe your company" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="industry"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Industry</FormLabel>
//                           <FormControl>
//                             <Input placeholder="e.g., Technology, Healthcare" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="foundedDate"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Founded Date</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="date"
//                               {...field}
//                               value={field.value ? field.value.toISOString().split("T")[0] : ""}
//                               onChange={(e) => field.onChange(new Date(e.target.value))}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex justify-end space-x-4">
//                   <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
//                     Cancel
//                   </Button>
//                   <Button type="submit">Save Changes</Button>
//                 </div>
//               </form>
//             </Form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Company Overview Card */}
//         <Card className="col-span-1 lg:col-span-3">
//           <CardContent className="p-6">
//             <div className="flex flex-col md:flex-row gap-6 items-start">
//               <div className="flex-shrink-0">
//                 <img
//                   src={companyData.logo || "/placeholder.svg"}
//                   alt={`${companyData.companyName} logo`}
//                   className="w-24 h-24 rounded-lg object-cover border"
//                 />
//               </div>
//               <div className="space-y-4 flex-1">
//                 <div>
//                   <h2 className="text-2xl font-bold">{companyData.companyName}</h2>
//                   <p className="text-muted-foreground">{companyData.industry}</p>
//                 </div>
//                 <p className="text-sm">{companyData.description}</p>
//                 <div className="flex flex-wrap gap-2">
//                   <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
//                     {companyData.industry}
//                   </span>
//                   <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
//                     Active
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Quick Stats Card */}
//         <Card>
//           <CardContent className="p-6">
//             <h3 className="text-lg font-semibold mb-4">Company Stats</h3>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-muted-foreground">Founded</span>
//                 <span className="font-medium">
//                   {companyData.foundedDate ? format(companyData.foundedDate, "MMM yyyy") : "N/A"}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-muted-foreground">Employees</span>
//                 <span className="font-medium">24</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-muted-foreground">Departments</span>
//                 <span className="font-medium">5</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-muted-foreground">Last Updated</span>
//                 <span className="font-medium">{format(companyData.updatedAt, "dd MMM yyyy")}</span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Contact Information Card */}
//         <Card>
//           <CardContent className="p-6">
//             <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
//             <div className="space-y-4">
//               <div className="flex items-start gap-3">
//                 <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-sm font-medium">Address</p>
//                   <p className="text-sm text-muted-foreground">{companyData.address}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
//                 <div>
//                   <p className="text-sm font-medium">Phone</p>
//                   <p className="text-sm text-muted-foreground">{companyData.phone}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
//                 <div>
//                   <p className="text-sm font-medium">Email</p>
//                   <p className="text-sm text-muted-foreground">{companyData.email}</p>
//                 </div>
//               </div>
//               {companyData.website && (
//                 <div className="flex items-center gap-3">
//                   <Globe className="h-5 w-5 text-muted-foreground flex-shrink-0" />
//                   <div>
//                     <p className="text-sm font-medium">Website</p>
//                     <a
//                       href={companyData.website}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-sm text-blue-600 hover:underline"
//                     >
//                       {companyData.website.replace(/(^\w+:|^)\/\//, "")}
//                     </a>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Legal Information Card */}
//         <Card>
//           <CardContent className="p-6">
//             <h3 className="text-lg font-semibold mb-4">Legal Information</h3>
//             <div className="space-y-4">
//               <div className="flex items-center gap-3">
//                 <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
//                 <div>
//                   <p className="text-sm font-medium">Registration Number</p>
//                   <p className="text-sm text-muted-foreground">{companyData.registrationNo || "Not provided"}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
//                 <div>
//                   <p className="text-sm font-medium">Tax Number</p>
//                   <p className="text-sm text-muted-foreground">{companyData.taxNumber || "Not provided"}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0" />
//                 <div>
//                   <p className="text-sm font-medium">Founded Date</p>
//                   <p className="text-sm text-muted-foreground">
//                     {companyData.foundedDate ? format(companyData.foundedDate, "dd MMMM yyyy") : "Not provided"}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Briefcase className="h-5 w-5 text-muted-foreground flex-shrink-0" />
//                 <div>
//                   <p className="text-sm font-medium">Industry</p>
//                   <p className="text-sm text-muted-foreground">{companyData.industry || "Not provided"}</p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }















import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import { Mail, Phone, Globe, FileText, Calendar, Briefcase, MapPin } from "lucide-react"
import { requireCompany } from "@/app/utils/hooks"
import Image from "next/image"
import { UpdateCompanyDialog } from "./components/update-company"

export default async function CompanyProfile() {
  const companyData = await requireCompany()

  return (
    <div className="mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Company Profile</h1>
          <p className="text-muted-foreground mt-1">View and manage your company information</p>
        </div>
        <UpdateCompanyDialog companyData={{
          ...companyData,
          foundedDate: companyData.foundedDate || new Date(),
          website: companyData.website || undefined,
          taxNumber: companyData.taxNumber || undefined,
          registrationNo: companyData.registrationNo || undefined,
          description: companyData.description || undefined,
          industry: companyData.industry || undefined
        }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-3">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <Image
                width={100}
                height={100}
                  src={companyData.logo || "/placeholder.png"}
                  alt={`${companyData.companyName} logo`}
                  className="w-24 h-24 rounded-lg object-cover border"
                />
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h2 className="text-2xl font-bold">{companyData.companyName}</h2>
                  <p className="text-muted-foreground">{companyData.industry}</p>
                </div>
                <p className="text-sm">{companyData.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {companyData.industry}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Card */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Company Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Founded</span>
                <span className="font-medium">
                  {companyData.foundedDate ? format(companyData.foundedDate, "MMM yyyy") : "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Employees</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Departments</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium">{format(companyData.updatedAt, "dd MMM yyyy")}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information Card */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{companyData.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{companyData.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{companyData.email}</p>
                </div>
              </div>
              {companyData.website && (
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Website</p>
                    <a
                      href={companyData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {companyData.website.replace(/(^\w+:|^)\/\//, "")}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Legal Information Card */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Legal Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Registration Number</p>
                  <p className="text-sm text-muted-foreground">{companyData.registrationNo || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Tax Number</p>
                  <p className="text-sm text-muted-foreground">{companyData.taxNumber || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Founded Date</p>
                  <p className="text-sm text-muted-foreground">
                    {companyData.foundedDate ? format(companyData.foundedDate, "dd MMMM yyyy") : "Not provided"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Industry</p>
                  <p className="text-sm text-muted-foreground">{companyData.industry || "Not provided"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}