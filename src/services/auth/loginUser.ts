/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/auth.utils";
import { parse } from "cookie"
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { setCookie } from "./tokenHandlers";

export const loginUser = async (_currentState: any, formData: FormData): Promise<any> => {
  try {
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;
    const redirectPath = formData.get("redirectPath") || null;

    const loginData = {
      email: formData.get("email"),
      password: formData.get("password")
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: result.message || "Login failed"
      };
    }

    const setCookieHeaders = res.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parseCookie = parse(cookie);

        if (parseCookie["accessToken"]) {
          accessTokenObject = parseCookie;
        }

        if (parseCookie["refreshToken"]) {
          refreshTokenObject = parseCookie;
        }
      })
    } else {
      throw new Error("No set-cookie found")
    }

    if (!accessTokenObject) {
      throw new Error("AccessToken not found in cookies");
    }
    if (!refreshTokenObject) {
      throw new Error("RefreshToken not found in cookies");
    }

    await setCookie("accessToken", accessTokenObject.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 60 * 60 * 24,
      path: accessTokenObject.Path || "/"
    })

    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: parseInt(refreshTokenObject["Max-Age"]) || 60 * 60 * 24 * 30,
      path: refreshTokenObject.Path || "/"
    })

    const verifyToken: JwtPayload | string = jwt.verify(accessTokenObject.accessToken, process.env.JWT_ACCESS_SECRET as string)

    if (typeof verifyToken === "string") {
      throw new Error("invalid token")
    }

    const userRole: UserRole = verifyToken.role;

    if (redirectPath) {
      const requestedPath = redirectPath.toString();
      if (isValidRedirectForRole(requestedPath, userRole)) {
        redirect(requestedPath);
      } else {
        redirect(getDefaultDashboardRoute(userRole));
      }
    } else {
      redirect(getDefaultDashboardRoute(userRole));
    }

  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error
    }
    return { error: "Login failed" }
  }
}