// components/documents/documents-page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FileIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

// Mock data for demonstration
const companyDocuments = [
  {
    id: "1",
    name: "Company Policy.pdf",
    uploadedBy: "Admin",
    uploadedAt: "2023-10-15",
    size: "1.2 MB",
    type: "pdf",
    category: "company",
  },
  {
    id: "2",
    name: "Employee Handbook.docx",
    uploadedBy: "Admin",
    uploadedAt: "2023-09-20",
    size: "3.5 MB",
    type: "docx",
    category: "company",
  },
];

interface Document {
  id: string;
  name: string;
  uploadedBy: string;
  uploadedAt: string;
  size: string;
  type: string;
  category: string;
  url?: string;
}

export function DocumentsPage({ initialDocuments }: { initialDocuments: Document[] }) {
  const [uploadedFiles, setUploadedFiles] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const allDocuments = [...companyDocuments, ...initialDocuments, ...uploadedFiles];

  const filteredDocuments = allDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeTab === "all" ||
      (activeTab === "company" && doc.category === "company") ||
      (activeTab === "personal" && (doc.category === "personal" || doc.uploadedBy === "You"));
    return matchesSearch && matchesCategory;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadComplete = (res: any[]) => {
    const newFiles = res.map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      uploadedBy: "You",
      uploadedAt: new Date().toISOString().split("T")[0],
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.name.split(".").pop() || "",
      category: "personal",
      url: file.url,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
    alert("Upload Completed");
  };

  const handleUploadError = (error: Error) => {
    alert(`ERROR! ${error.message}`);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Documents</h1>
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="company">Company Documents</TabsTrigger>
            <TabsTrigger value="personal">My Documents</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Personal Document</CardTitle>
                <CardDescription>
                  Upload your personal documents like ID, certificates, etc. Supported formats: PDF, DOCX, JPG, PNG.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UploadButton
                  endpoint="documentUploader"
                  onClientUploadComplete={handleUploadComplete}
                  onUploadError={handleUploadError}
                />
              </CardContent>
            </Card>
          </div>

          <DocumentCards documents={filteredDocuments} showDeleteButton={true} />
        </TabsContent>

        <TabsContent value="company" className="mt-6">
          <DocumentCards 
            documents={filteredDocuments.filter(doc => doc.category === "company")} 
            showDeleteButton={false}
          />
        </TabsContent>

        <TabsContent value="personal" className="mt-6">
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Personal Document</CardTitle>
                <CardDescription>
                  Upload your personal documents like ID, certificates, etc. Supported formats: PDF, DOCX, JPG, PNG.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UploadDropzone
                  endpoint="documentUploader"
                  onClientUploadComplete={handleUploadComplete}
                  onUploadError={handleUploadError}
                />
              </CardContent>
            </Card>
          </div>

          <DocumentCards 
            documents={filteredDocuments.filter(doc => 
              doc.category === "personal" || doc.uploadedBy === "You"
            )} 
            showDeleteButton={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DocumentCards({ documents, showDeleteButton }: { documents: Document[], showDeleteButton: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => (
        <Card key={doc.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <FileIcon className="h-8 w-8 text-blue-500" />
                <div>
                  <CardTitle className="text-lg">{doc.name}</CardTitle>
                  <CardDescription>
                    {doc.category === "company" 
                      ? `Uploaded by ${doc.uploadedBy} on ${doc.uploadedAt}`
                      : `Uploaded on ${doc.uploadedAt}`}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Size: {doc.size}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              Download
            </Button>
            {showDeleteButton && doc.uploadedBy === "You" && (
              <Button variant="ghost" size="sm" className="text-red-500">
                Delete
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}