import { headers } from "next/headers";
import { auth } from "./auth";
import { prisma } from "./db";

export const getCurrentUser = async () => {

    const data = await auth.api.getSession({
        headers: await headers()
    })

    const userId = data?.user.id;

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new Error("Unauthorized");
    }
    return user;
}