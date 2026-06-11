import { NextRequest, NextResponse } from "next/server";

const ADMIN_LOGIN = "/admin/auth/login";
const ADMIN_DASHBOARD = "/admin/dashboard";

const APPLICANT_LOGIN = "/applicant/auth/login";
const APPLICANT_DASHBOARD = "/applicant/dashboard";

const PUBLIC_ADMIN_ROUTES = [ADMIN_LOGIN];
const PUBLIC_APPLICANT_ROUTES = [
  APPLICANT_LOGIN,
  "/applicant/apply",
  "/applicant/apply/success",
];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const adminRefreshToken = req.cookies.get("adminRefreshToken")?.value;
  const applicantRefreshToken = req.cookies.get("applicantRefreshToken")?.value;

  const isAdminRoute = pathname.startsWith("/admin");
  const isApplicantRoute = pathname.startsWith("/applicant");

  const isAdminAuthRoute = pathname.startsWith("/admin/auth");
  const isApplicantAuthRoute = pathname.startsWith("/applicant/auth");

  // /admin -> /admin/dashboard
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL(ADMIN_DASHBOARD, req.url));
  }

  // /applicant -> /applicant/dashboard
  if (pathname === "/applicant") {
    return NextResponse.redirect(new URL(APPLICANT_DASHBOARD, req.url));
  }

  // Protect admin routes
  if (isAdminRoute) {
    const isPublicAdminRoute = PUBLIC_ADMIN_ROUTES.includes(pathname);

    if (!adminRefreshToken && !isPublicAdminRoute) {
      return NextResponse.redirect(new URL(ADMIN_LOGIN, req.url));
    }

    if (adminRefreshToken && isAdminAuthRoute) {
      return NextResponse.redirect(new URL(ADMIN_DASHBOARD, req.url));
    }
  }

  // Protect applicant routes
  if (isApplicantRoute) {
    const isPublicApplicantRoute = PUBLIC_APPLICANT_ROUTES.includes(pathname);

    if (!applicantRefreshToken && !isPublicApplicantRoute) {
      return NextResponse.redirect(new URL(APPLICANT_LOGIN, req.url));
    }

    if (applicantRefreshToken && isApplicantAuthRoute) {
      return NextResponse.redirect(new URL(APPLICANT_DASHBOARD, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/applicant/:path*"],
};
