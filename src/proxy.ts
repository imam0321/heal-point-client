import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from './lib/auth.utils';
import { deleteCookie, getCookie } from './services/auth/tokenHandlers';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // cookie থেকে accessToken নেওয়া
  const accessToken = await getCookie("accessToken") || null;

  let userRole: UserRole | null = null;
  if (accessToken) {
    // accessToken থাকলে তা verify করছি
    const verifyToken: JwtPayload | string = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string)

    // token invalid হলে logout করে login এ পাঠানো
    if (typeof verifyToken === "string") {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url))
    }

    userRole = verifyToken.role;
  }

  // এই route এর owner কে?
  const routeOwner = getRouteOwner(pathname);
  // auth route কিনা (login/register)
  const isAuth = isAuthRoute(pathname);

  // user logged in থাকলে login/register এ যেতে দেবে না → dashboard এ পাঠাবে
  if (accessToken && isAuth) {
    return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
  }

  if (routeOwner === null) {
    return NextResponse.next();
  }

  // user logged in না থাকলে login এ redirect
  if (!accessToken) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // common route হলে সব logged-in user ঢুকতে পারবে
  if (routeOwner === "COMMON") {
    return NextResponse.next();
  }

  // Admin/Doctor/Patient specific route
  // userRole আর routeOwner না মিললে → নিজের dashboard এ পাঠানো হবে
  if (routeOwner === "ADMIN" || routeOwner === "DOCTOR" || routeOwner === "PATIENT") {
    if (userRole !== routeOwner) {
      return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
  ],
}