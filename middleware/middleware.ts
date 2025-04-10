import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";
import { Role } from "@/types";

const protectedRoutes = ["/", "/monitor", "/admin", "/co-mentor", "/student"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  console.log(token);
  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const user = verifyToken(token);

    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const currentPath = request.nextUrl.pathname;

    if (currentPath.startsWith("/admin") && role !== Role.ADMIN) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (currentPath.startsWith("/monitor") && role !== Role.MONITOR) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (currentPath.startsWith("/co-mentor") && role !== Role.CO_MONITOR) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (currentPath.startsWith("/student") && role !== Role.STUDENT) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}
