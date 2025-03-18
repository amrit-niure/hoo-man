"use server"
import { prisma } from "@/lib/db";
import { requireCompany } from "../utils/hooks";
import { addCompanySchema, IAddCompany } from "./components/validation";
import { response } from "../utils/response";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const createCompanyProfile = async (data: IAddCompany) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session) {
            redirect("/signin");
        }
        const validatedData = addCompanySchema.parse(data);
        await prisma.companyProfile.create({
            data: {
                ...validatedData,
                userId: session.user.id,
            },
        });
        await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                onBoarded: true,
            },
        });
        return response(true, "Company profile created successfully", null, "/admin");
    } catch (error) {
        console.error("Error creating company profile:", error);
        return response(false, "Error creating company profile", error);
    }
}

export const updateCompanyProfile = async (data: IAddCompany) => {
    try {
        const company = await requireCompany();
        const validatedData = addCompanySchema.parse(data)

        if (!company.userId) {
            return response(false, "Company not found", null, "/admin")
        }

        await prisma.companyProfile.update({
            where: {
                id: company.id,
                userId: company.userId,
            },
            data: {
                ...validatedData,
            },
        })
        revalidatePath("/admin")
        return response(true, "Company profile updated successfully", null, "/admin")
    } catch (error) {
        console.error("Error updating company profile:", error)
        return response(false, "Error updating company profile", error)
    }
}