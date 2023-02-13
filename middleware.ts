// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useAccountStore } from "./store/store";
import { shallow } from "zustand/shallow";

export async function middleware(request: NextRequest) {
  const cookies_token = request.cookies.get("token");

  if (
    request.nextUrl.pathname.startsWith("/login") &&
    cookies_token !== undefined
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  NextResponse.next();
}
