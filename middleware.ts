import { verifyRequestOrigin } from "lucia";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { origin } = req.nextUrl;
  const sessionId = req.cookies.get("campaigns-auth-cookie")?.value || null;

  if (!sessionId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (req.method === "GET") {
    return NextResponse.next();
  }
  const originHeader = req.headers.get("Origin");
  // NOTE: You may need to use `X-Forwarded-Host` instead
  const hostHeader = req.headers.get("Host");
  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};

// middleware.ts https://lucia-auth.com/guides/validate-session-cookies/nextjs-app
// import { verifyRequestOrigin } from "lucia";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(request: NextRequest): Promise<NextResponse> {
// 	if (request.method === "GET") {
// 		return NextResponse.next();
// 	}
// 	const originHeader = request.headers.get("Origin");
// 	// NOTE: You may need to use `X-Forwarded-Host` instead
// 	const hostHeader = request.headers.get("Host");
// 	if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
// 		return new NextResponse(null, {
// 			status: 403
// 		});
// 	}
// 	return NextResponse.next();
// }
