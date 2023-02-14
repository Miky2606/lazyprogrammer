// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookies_token = request.cookies.get("token");

  if (
    request.nextUrl.pathname.startsWith("/login") &&
    cookies_token !== undefined
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
