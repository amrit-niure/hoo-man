
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { FileIcon } from "lucide-react";
// import { toast } from "sonner";
// import { useFormStatus } from "react-dom";

// import { Button, buttonVariants } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { UploadDropzone } from "@/lib/uploadthing";
// import { updateEmployeeDocuments } from "./actions";

// function SubmitButton() {
//   const { pending } = useFormStatus();
//   return (
//     <Button type="submit" disabled={pending} className="mt-4">
//       {pending ? "Saving..." : "Save Documents"}
//     </Button>
//   );
// }

// interface EmployeeDocumentsClientProps {
//   employeeId: string;
//   employeeName: string;
//   documentUrls: string[];
// }

// export default function EmployeeDocumentsClient({
//   employeeId,
//   employeeName,
//   documentUrls,
// }: EmployeeDocumentsClientProps) {
//   const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const allDocuments = [...documentUrls];
//   const filteredDocuments = allDocuments.filter((url) =>
//     url.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleDelete = (url: string) => {
//     if (documentUrls.includes(url)) {
//       // Mark for removal from database on save
//       setUploadedUrls((prev) => [...prev, `DELETE:${url}`]);
//     } else {
//       setUploadedUrls((prev) => prev.filter((u) => u !== url));
//     }
//     toast.success("Document marked for removal. Save to confirm.");
//   };

//   return (
//     <div className="container mx-auto py-6">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-3xl font-bold">{employeeName}'s Documents</h1>
//         <Link href={`/employee/${employeeId}`}>
//           <Button variant="outline">Back to Profile</Button>
//         </Link>
//       </div>

//       <div className="space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Upload New Document</CardTitle>
//             <CardDescription>
//               Upload documents for {employeeName}. Supported formats: PDF, DOCX,
//               XLSX, JPG, PNG.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form
//               action={async () => {
//                 await updateEmployeeDocuments(uploadedUrls);
//                 window.location.reload();
//               }}
//             >
//               <div className="space-y-4">
//                 <UploadDropzone
//                   endpoint="documentUploader"
//                   onClientUploadComplete={(res) => {
//                     const newUrls = res.map((file) => file.url);
//                     setUploadedUrls((prev) => [...prev, ...newUrls]);
//                     toast.success("Upload completed!");
//                   }}
//                   onUploadError={(error) => {
//                     toast.error(`Upload failed: ${error.message}`);
//                   }}
//                   config={{
//                     mode: "auto",
//                     appendOnPaste: true,
//                   }}
//                   appearance={{
//                     container: {
//                       border: "1px dashed #2563eb",
//                       borderRadius: "0.5rem",
//                       padding: "1.5rem",
//                       backgroundColor: "transparent",
//                     },
//                     uploadIcon: {
//                       color: "#2563eb",
//                     },
//                     label: {
//                       color: "#2563eb",
//                       fontSize: "1rem",
//                       fontWeight: "500",
//                     },
//                     allowedContent: {
//                       color: "#6b7280",
//                       fontSize: "0.875rem",
//                     },
//                     button: {
//                       backgroundColor: "#2563eb",
//                       color: "white",
//                       padding: "0.5rem 1rem",
//                       borderRadius: "0.375rem",
//                       fontSize: "0.875rem",
//                       fontWeight: "500",
//                       marginTop: "1rem",
                     
//                     },
//                   }}
//                 />
//                 <Input
//                   placeholder="Search documents..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full md:w-64"
//                 />
//               </div>
//               <CardFooter className="flex justify-end px-0 pb-0 pt-6">
//                 <SubmitButton />
//               </CardFooter>
//             </form>
//           </CardContent>
//         </Card>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredDocuments
//             .filter((url) => !uploadedUrls.includes(`DELETE:${url}`))
//             .map((url) => {
//               const fileName = url.split("/").pop() || "Document";
//               const fileType =
//                 fileName.split(".").pop()?.toUpperCase() || "FILE";
//               const isMarkedForDelete = uploadedUrls.includes(`DELETE:${url}`);

//               return (
//                 <Card
//                   key={url}
//                   className={isMarkedForDelete ? "opacity-50" : ""}
//                 >
//                   <CardHeader className="pb-2">
//                     <div className="flex items-center gap-3">
//                       <FileIcon className="h-6 w-6 text-blue-500" />
//                       <div className="truncate">
//                         <p className="font-medium truncate">
//                           {fileName.length > 20
//                             ? `${fileName.substring(0, 5)}`
//                             : fileName}
//                         </p>
//                         <p className="text-xs text-muted-foreground truncate">
//                           <a href={url} target="_blank" className={"text-blue-500 underline font-bold"}>Open File</a>
//                         </p>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardFooter className="flex justify-between gap-2">
//                     <Button variant="outline" size="sm" asChild>
//                       <a href={url} download target="_blank" rel="noopener">
//                         Download
//                       </a>
//                     </Button>
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       onClick={() => handleDelete(url)}
//                       disabled={isMarkedForDelete}
//                     >
//                       {isMarkedForDelete ? "Will be deleted" : "Delete"}
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               );
//             })}
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import Link from "next/link";
import { FileIcon, Building2 } from "lucide-react";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UploadDropzone } from "@/lib/uploadthing";
import { updateEmployeeDocuments } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="mt-4">
      {pending ? "Saving..." : "Save Documents"}
    </Button>
  );
}

interface EmployeeDocumentsClientProps {
  employeeId: string;
  employeeName: string;
  documentUrls: string[];
  companyDocuments: string[]; // Add company documents prop
}

export default function EmployeeDocumentsClient({
  employeeId,
  employeeName,
  documentUrls,
  companyDocuments = [] // Default empty array
}: EmployeeDocumentsClientProps) {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("employee");

  // Filter documents based on search query
  const filteredEmployeeDocs = documentUrls
    .filter(url => !uploadedUrls.includes(`DELETE:${url}`))
    .filter(url => url.toLowerCase().includes(searchQuery.toLowerCase()));

  const filteredCompanyDocs = companyDocuments
    .filter(url => url.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleDelete = (url: string) => {
    if (documentUrls.includes(url)) {
      setUploadedUrls(prev => [...prev, `DELETE:${url}`]);
    } else {
      setUploadedUrls(prev => prev.filter(u => u !== url));
    }
    toast.success("Document marked for removal. Save to confirm.");
  };

  const renderDocumentCard = (url: string, isCompanyDoc = false) => {
    const fileName = url.split('/').pop() || "Document";
    const isMarkedForDelete = uploadedUrls.includes(`DELETE:${url}`);

    return (
      <Card key={url} className={isMarkedForDelete ? "opacity-50" : ""}>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <FileIcon className="h-6 w-6 text-blue-500" />
            <div className="truncate">
              <p className="font-medium truncate">
                {fileName.length > 20 ? `${fileName.substring(0, 15)}...` : fileName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                <a href={url} target="_blank" className="text-blue-500 underline font-bold">
                  Open File
                </a>
              </p>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={url} download target="_blank" rel="noopener">
              Download
            </a>
          </Button>
          {!isCompanyDoc && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(url)}
              disabled={isMarkedForDelete}
            >
              {isMarkedForDelete ? "Will be deleted" : "Delete"}
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{employeeName}'s Documents</h1>
        <Link href={`/employee/${employeeId}`}>
          <Button variant="outline">Back to Profile</Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="employee">
              <FileIcon className="h-4 w-4 mr-2" />
              Employee Documents
            </TabsTrigger>
            <TabsTrigger value="company">
              <Building2 className="h-4 w-4 mr-2" />
              Company Documents
            </TabsTrigger>
          </TabsList>
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
        </div>

        {/* Employee Documents Tab */}
        <TabsContent value="employee" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Document</CardTitle>
              <CardDescription>
                Upload personal documents for {employeeName}. Supported formats: PDF, DOCX, XLSX, JPG, PNG.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={async () => {
                await updateEmployeeDocuments(uploadedUrls);
                window.location.reload();
              }}>
                <div className="space-y-4">
                  <UploadDropzone
                    endpoint="documentUploader"
                    onClientUploadComplete={(res) => {
                      const newUrls = res.map(file => file.url);
                      setUploadedUrls(prev => [...prev, ...newUrls]);
                      toast.success("Upload completed!");
                    }}
                    onUploadError={(error) => {
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                    appearance={{
                      container: {
                        border: "1px dashed #2563eb",
                        borderRadius: "0.5rem",
                        padding: "1.5rem",
                        backgroundColor: "transparent",
                      },
                      uploadIcon: {
                        color: "#2563eb",
                      },
                      label: {
                        color: "#2563eb",
                        fontSize: "1rem",
                        fontWeight: "500",
                      },
                      allowedContent: {
                        color: "#6b7280",
                        fontSize: "0.875rem",
                      },
                      button: {
                        backgroundColor: "#2563eb",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.375rem",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        marginTop: "1rem",
                      },
                    }}
                  />
                </div>
                <CardFooter className="flex justify-end px-0 pb-0 pt-6">
                  <SubmitButton />
                </CardFooter>
              </form>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEmployeeDocs.map(url => renderDocumentCard(url))}
            {filteredEmployeeDocs.length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No employee documents found
              </div>
            )}
          </div>
        </TabsContent>

        {/* Company Documents Tab */}
        <TabsContent value="company" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Documents</CardTitle>
              <CardDescription>
                These are shared documents from your company. You can download but not modify them.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {filteredCompanyDocs.map(url => renderDocumentCard(url, true))}
            {filteredCompanyDocs.length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No company documents found
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
