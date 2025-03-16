import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { nextCookies } from "better-auth/next-js";
import { Role } from "@prisma/client";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },
  user : {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        default: Role.USER
      },
      onBoarded: {
        type: 'boolean',
        required: false,
        default: false
      }
    }
  },
  plugins: [nextCookies()] 
});