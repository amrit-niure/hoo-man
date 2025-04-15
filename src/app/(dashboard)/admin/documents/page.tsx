"use client"

import { useActionState, useEffect, useState } from "react"
import Link from "next/link"
import { FileIcon } from "lucide-react"
import {  useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadDropzone } from "@/lib/uploadthing"
import { deleteCompanyDocument, getCompanyDocuments, updateCompanyDocuments } from "./actions"
import { toast } from "sonner"

// function DeleteButton() {
//   const { pending } = useFormStatus()
//   return (
//     <Button 
//       type="submit" 
//       variant="ghost" 
//       size="sm" 
//       className="text-red-500"
//       disabled={pending}
//     >
//       {pending ? "Deleting..." : "Delete"}
//     </Button>
//   )
// }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="mt-4">
      {pending ? "Saving..." : "Save Documents"}
    </Button>
  )
}


export default function CompanyDocumentsPage() {
//eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [documents, setDocuments] = useState<any[]>([]) // Now managed via state
  const [state, formAction] = useActionState(updateCompanyDocuments, { success: false, message: "" })

  useEffect(() => {
    const fetchDocuments = async () => {
      const result = await getCompanyDocuments()
      if (result.success) {
        // Transform URLs into document objects for display
        const docs = result.documents.map((url, index) => ({
          id: `db-${index}`,
          name: url.split('/').pop() || `Document ${index + 1}`,
          uploadedBy: "Company",
          uploadedAt: new Date().toISOString().split('T')[0], // Use actual date if available
          size: "N/A", // You might want to fetch this info
          type: url.split('.').pop() || "file",
          url: url
        }))
        setDocuments(docs)
      }
    }
    fetchDocuments()
  }, [])

  const filteredDocuments = [...documents, ...uploadedFiles].filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  const handleDelete = async (documentUrl: string) => {
    const result = await deleteCompanyDocument(documentUrl)
    if (result.success) {
      // Update local state to remove the deleted document
      setDocuments(documents.filter(doc => doc.url !== documentUrl))
      setUploadedFiles(uploadedFiles.filter(file => file.url !== documentUrl))
    } else {
      alert(result.message || "Failed to delete document")
    }
  }
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Company Documents</h1>
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>

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
          <form action={formAction}>
            <div className="mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload New Document</CardTitle>
                  <CardDescription>
                    Upload company documents to share with employees. Supported formats: PDF, DOCX, XLSX, JPG, PNG.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
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
                          url: file.url,
                        }))
                        setUploadedFiles((prev) => [...prev, ...newFiles])
                        toast("Upload Completed")
                      }}
                      onUploadError={(error: Error) => {
                        toast(`ERROR! ${error.message}`)
                      }}
                      config={{
                        mode: "auto",
                        appendOnPaste: true,
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
                    {/* Hidden input to store document URLs */}
                    <input
                      type="hidden"
                      name="documents"
                      value={JSON.stringify([...uploadedFiles.map(file => file.url)])}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <SubmitButton />
                </CardFooter>
              </Card>
              {state?.message && (
                <p className={`mt-2 text-sm ${
                  state.success ? "text-green-600" : "text-red-600"
                }`}>
                  {state.message}
                </p>
              )}
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
    <Card key={doc.id}>
    <CardHeader className="pb-2">
      <div className="flex items-start justify-between">
        {/* Apply min-w-0 to this flex item */}
        <div className="flex flex-1 items-center gap-2 min-w-0">
          <FileIcon className="h-8 w-8 flex-shrink-0 text-blue-500" />
          {/* Apply min-w-0 here too, helps constrain the title/desc block */}
          <div className="min-w-0">
            <CardTitle className="text-lg truncate">{doc.name.substring(0,5)}...</CardTitle>{" "}
            {/* Keep truncate */}
            <CardDescription>
              Uploaded by {doc.uploadedBy} on {doc.uploadedAt}
            </CardDescription>
          </div>
        </div>
        {/* Add other elements here if needed, like actions */}
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">Size: {doc.size}</p>
      {/* You might want to truncate the URL too */}
      <p className="text-xs text-muted-foreground truncate">{doc.url}</p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" size="sm" asChild>
        <a
          href={doc.url}
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
      </Button>
      {/* Ensure DeleteButton is correctly imported and used */}
      {/* <form action={() => handleDelete(doc.url)}>
        <DeleteButton />
      </form> */}
      <Button
        variant="destructive"
        size="sm"
        onClick={() => handleDelete(doc.url)}
      >
        Delete
      </Button>
    </CardFooter>
  </Card>
        ))}
      </div>

        </TabsContent>

        {/* Other tabs remain the same */}
      </Tabs>
    </div>
  )
}