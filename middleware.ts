import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
 
export async function middleware(request: NextRequest) {
    console.log("Middleware Running")
    const session = await auth.api.getSession({
        headers: await headers()
    })
 
    if(!session) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
 
    return NextResponse.next();
}
 
export const config = {
    matcher: ["/admin/:path*","/((?!api/webhooks/stripe|_next/static|_next/image|favicon.ico).*)"],
  runtime: "nodejs",
};