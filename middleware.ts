import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/_next")) {
      return NextResponse.next();
    }
    return NextResponse.rewrite(new URL("/admin", req.url));
  },
  {
    callbacks: {
      authorized({ token }) {
        return token?.email === "admin";
      },
    },
  },
);
export const config = { matcher: ["/admin/:path*", "/user/profile"] };
