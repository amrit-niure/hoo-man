"use server"
import "server-only";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSessionData } from "@/lib/get-session-data";



export async function requireUser() {
    const session = await getSessionData();
    if (!session) {
        return null
    }
    if (session.user) {
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                image: true,
                employee: true,
                company: true,
            },
        });

        if (!user) {
            return null
        }
        return user
    }
}

export async function requireCompany() {
    const session = await requireUser();
    const company = await prisma.companyProfile.findUnique({
        where: {
            userId: session?.id as string,
        }
    });

    if (!company) {
        redirect("/");
    }

    return company;
}