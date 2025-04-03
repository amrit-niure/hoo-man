"use client"

import { useState } from "react"
import Link from "next/link"
import { FileIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadButton, UploadDropzone } from "@/lib/uploadthing"

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
]

const personalDocuments = [
  {
    id: "3",
    name: "ID Card.jpg",
    uploadedBy: "You",
    uploadedAt: "2023-11-10",
    size: "0.8 MB",
    type: "jpg",
    category: "personal",
  },
  {
    id: "4",
    name: "Resume.pdf",
    uploadedBy: "You",
    uploadedAt: "2023-10-05",
    size: "1.5 MB",
    type: "pdf",
    category: "personal",
  },
]

export default function EmployeeDocumentsPage() {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const allDocuments = [...companyDocuments, ...personalDocuments, ...uploadedFiles]

  const filteredDocuments = allDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      activeTab === "all" ||
      (activeTab === "company" && doc.category === "company") ||
      (activeTab === "personal" && (doc.category === "personal" || doc.uploadedBy === "You"))
    return matchesSearch && matchesCategory
  })

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
                  onClientUploadComplete={(res) => {
                    // Add the uploaded files to the state
                    const newFiles = res.map((file) => ({
                      id: Math.random().toString(36).substring(7),
                      name: file.name,
                      uploadedBy: "You",
                      uploadedAt: new Date().toISOString().split("T")[0],
                      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                      type: file.name.split(".").pop() || "",
                      category: "personal",
                      url: file.url,
                    }))
                    setUploadedFiles((prev) => [...prev, ...newFiles])
                    alert("Upload Completed")
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`)
                  }}
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FileIcon className="h-8 w-8 text-blue-500" />
                      <div>
                        <CardTitle className="text-lg">{doc.name}</CardTitle>
                        <CardDescription>
                          {doc.category === "company" ? "Company Document" : "Personal Document"}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Uploaded: {doc.uploadedAt}</p>
                  <p className="text-sm text-muted-foreground">Size: {doc.size}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                  {doc.uploadedBy === "You" && (
                    <Button variant="ghost" size="sm" className="text-red-500">
                      Delete
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="company" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FileIcon className="h-8 w-8 text-blue-500" />
                      <div>
                        <CardTitle className="text-lg">{doc.name}</CardTitle>
                        <CardDescription>
                          Uploaded by {doc.uploadedBy} on {doc.uploadedAt}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Size: {doc.size}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
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
                  onClientUploadComplete={(res) => {
                    // Add the uploaded files to the state
                    const newFiles = res.map((file) => ({
                      id: Math.random().toString(36).substring(7),
                      name: file.name,
                      uploadedBy: "You",
                      uploadedAt: new Date().toISOString().split("T")[0],
                      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                      type: file.name.split(".").pop() || "",
                      category: "personal",
                      url: file.url,
                    }))
                    setUploadedFiles((prev) => [...prev, ...newFiles])
                    alert("Upload Completed")
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`)
                  }}
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FileIcon className="h-8 w-8 text-blue-500" />
                      <div>
                        <CardTitle className="text-lg">{doc.name}</CardTitle>
                        <CardDescription>Uploaded on {doc.uploadedAt}</CardDescription>
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
                  <Button variant="ghost" size="sm" className="text-red-500">
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

