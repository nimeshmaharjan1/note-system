import { verify } from "@lib/api/verify-jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const jwt = req.cookies.get("jwt");
  const secret = process.env.ACCESS_TOKEN_SECRET as string;
  const url = req.url;
  const { pathname } = req.nextUrl;

  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/dashboard")) {
    if (jwt === undefined) {
      req.nextUrl.pathname = "/login";
      return NextResponse.redirect(req.nextUrl);
    }

    try {
      await verify(jwt, secret);
      return NextResponse.next();
    } catch (error) {
      req.nextUrl.pathname = "/login";
      return NextResponse.redirect(req.nextUrl);
    }
  }

  return NextResponse.next();
}
