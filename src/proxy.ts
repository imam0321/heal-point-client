import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';

type UserRole = "PATIENT" | "DOCTOR" | "ADMIN";

type RouteConfig = {
  exact: string[],
  patterns: RegExp[]
}

// যেসব route এ লগইন ছাড়া যাওয়া যায়
const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

// কমন ইউজারের জন্য protected route
const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "settings"],
  patterns: [],
}

// ডাক্তারদের protected route
const doctorProtectedRoutes: RouteConfig = {
  patterns: [/^\/doctor/],
  exact: []
}

// অ্যাডমিনদের protected route
const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/],
  exact: []
}

// পেশেন্টদের protected route
const patientProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard/],
  exact: []
}

// এই ফাংশন চেক করে route টি auth route কিনা
const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route: string) => route === pathname);
}

// এই ফাংশন চেক করে route টি কোন protected routes এর সাথে match করছে
const isRouterMatches = (pathname: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathname)) {
    return true
  }

  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
}

// কোন route কোন role এর জন্য তা বের করে
const getRouteOwner = (pathname: string): "PATIENT" | "DOCTOR" | "ADMIN" | "COMMON" | null => {
  switch (true) {
    case isRouterMatches(pathname, adminProtectedRoutes):
      return "ADMIN"
    case isRouterMatches(pathname, doctorProtectedRoutes):
      return "DOCTOR"
    case isRouterMatches(pathname, patientProtectedRoutes):
      return "PATIENT"
    default:
      return "COMMON"
  }
}

// প্রতিটি role এর default dashboard route
const getDefaultDashboardRoute = (role: UserRole): string => {
  switch (role) {
    case "ADMIN":
      return "/admin/dashboard";
    case "DOCTOR":
      return "/doctor/dashboard";
    case "PATIENT":
      return "/dashboard";
    default:
      return "/";
  }
}

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const pathname = request.nextUrl.pathname;

  // cookie থেকে accessToken নেওয়া
  const accessToken = request.cookies.get("accessToken")?.value || null;

  let userRole: UserRole | null = null;
  if (accessToken) {
    // accessToken থাকলে তা verify করছি
    const verifyToken: JwtPayload | string = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string)

    // token invalid হলে logout করে login এ পাঠানো
    if (typeof verifyToken === "string") {
      cookieStore.delete("accessToken")
      cookieStore.delete("refreshToken")
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
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
  ],
}