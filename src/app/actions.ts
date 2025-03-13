"use server";

import { auth } from "@/lib/auth";

export const emailSignUp = async () => {
    const response = await auth.api.signUpEmail({
        body: {
            email:"email@gmail.com",
            password: "password12345",
            name: "Amrit Niure"
        },
        asResponse: true 
    });
    return response;
};
export const emailSignIn = async () => {
    const response = await auth.api.signInEmail({
        body: {
            email:"email@gmail.com",
            password: "password12345"
        },
        asResponse: true
    });
    return response;
};
 