import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export const getSessionData = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        redirect("/signin");
    }
    if (session?.user.role === "ADMIN" && !session?.user.onBoarded) {
        redirect("/onboarding");
    }
    return session;
}