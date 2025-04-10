"use server"

import { getCurrentUser } from "@/lib/current-user"
import { prisma } from "@/lib/db"

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateCompanyDocuments(prevState: any, formData: FormData) {
  try {
    const user = await getCurrentUser()
    if (!user || !user.companyProfileId) {
      return { success: false, message: "Unauthorized" }
    }

    const documents = JSON.parse(formData.get("documents") as string) as string[]

    await prisma.companyProfile.update({
      where: { id: user.companyProfileId },
      data: {
        documents: {
          push: documents, 
        },
      },
    })

    return { success: true, message: "Documents updated successfully" }
  } catch (error) {
    console.error("Error updating company documents:", error)
    return { success: false, message: "Failed to update documents" }
  }
}



// Get all documents for the current company
export async function getCompanyDocuments() {
  try {
    const user = await getCurrentUser()
    if (!user || !user.companyProfileId) {
      return { success: false, message: "Unauthorized", documents: [] }
    }

    const company = await prisma.companyProfile.findUnique({
      where: { id: user.companyProfileId },
      select: { documents: true }
    })

    return { 
      success: true, 
      documents: company?.documents || [] 
    }
  } catch (error) {
    console.error("Error fetching company documents:", error)
    return { success: false, message: "Failed to fetch documents", documents: [] }
  }
}

// Delete a document from the company
export async function deleteCompanyDocument(documentUrl: string) {
  try {
    const user = await getCurrentUser()
    if (!user || !user.companyProfileId) {
      return { success: false, message: "Unauthorized" }
    }

    const company = await prisma.companyProfile.findUnique({
      where: { id: user.companyProfileId }
    })

    if (!company) {
      return { success: false, message: "Company not found" }
    }

    // Filter out the document to be deleted
    const updatedDocuments = company.documents.filter(url => url !== documentUrl)

    await prisma.companyProfile.update({
      where: { id: user.companyProfileId },
      data: {
        documents: {
          set: updatedDocuments
        }
      }
    })

    return { success: true, message: "Document deleted successfully" }
  } catch (error) {
    console.error("Error deleting company document:", error)
    return { success: false, message: "Failed to delete document" }
  }
}

// Get all documents for the current company
export async function getEmployeeDocuments() {
  try {
    const user = await getCurrentUser()
    if (!user || !user.role || user.role !== "USER") {
      return { success: false, message: "Unauthorized", documents: [] }
    }

    const employee = await prisma.employee.findUnique({
      where: { userId: user.id },
      select: { documents: true }
    })

    return { 
      success: true, 
      documents: employee?.documents || [] 
    }
  } catch (error) {
    console.error("Error fetching employee documents:", error)
    return { success: false, message: "Failed to fetch documents", documents: [] }
  }
}