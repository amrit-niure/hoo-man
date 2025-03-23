import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export const getSessionData = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // If there's no session, redirect to the sign-in page.
    if (!session) {
        redirect("/signin");
    }

    // If the user is an ADMIN but has not completed onboarding,
    // redirect them to the onboarding page.
    if (session?.user.role === "ADMIN" && !session?.user.onBoarded) {
        redirect("/onboarding");
    }

    // If no redirect conditions were met, return the session data.
    return session;
};
