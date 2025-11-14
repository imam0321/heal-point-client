export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN";

export type RouteConfig = {
  exact: string[],
  patterns: RegExp[]
}

// যেসব route এ লগইন ছাড়া যাওয়া যায়
export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

// কমন ইউজারের জন্য protected route
export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/settings"],
  patterns: [],
}

// ডাক্তারদের protected route
export const doctorProtectedRoutes: RouteConfig = {
  patterns: [/^\/doctor/],
  exact: []
}

// অ্যাডমিনদের protected route
export const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/],
  exact: []
}

// পেশেন্টদের protected route
export const patientProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard/],
  exact: []
}

// এই ফাংশন চেক করে route টি auth route কিনা
export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route: string) => route === pathname);
}

// এই ফাংশন চেক করে route টি কোন protected routes এর সাথে match করছে
export const isRouterMatches = (pathname: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathname)) {
    return true
  }

  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
}

// কোন route কোন role এর জন্য তা বের করে
export const getRouteOwner = (pathname: string): "PATIENT" | "DOCTOR" | "ADMIN" | "COMMON" | null => {
  if (isRouterMatches(pathname, adminProtectedRoutes)) return "ADMIN";
  if (isRouterMatches(pathname, doctorProtectedRoutes)) return "DOCTOR";
  if (isRouterMatches(pathname, patientProtectedRoutes)) return "PATIENT";
  if (isRouterMatches(pathname, commonProtectedRoutes)) return "COMMON";
  return null;
}

// প্রতিটি role এর default dashboard route
export const getDefaultDashboardRoute = (role: UserRole): string => {
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

export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
  const routeOwner = getRouteOwner(redirectPath);
  if (routeOwner === null || routeOwner === "COMMON") {
    return true
  }

  if (routeOwner === role) {
    return true
  }

  return false
}