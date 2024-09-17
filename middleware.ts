import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { lucia } from "./lib/lucia";

export async function middleware(req: NextRequest) {
  const { origin } = req.nextUrl;
  const sessionId = req.cookies.get("campaigns-auth-cookie")?.value || null;

  if (!sessionId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // const { session } = await lucia.validateSession(sessionId);

  // if (!session) {
  //   return NextResponse.redirect("/sign-in");
  // }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
