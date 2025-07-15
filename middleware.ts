import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Protection des routes admin
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (req.nextauth.token?.role !== "ADMIN") {
        return NextResponse.rewrite(new URL("/auth/signin", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Permettre l'accès aux pages publiques
        if (!req.nextUrl.pathname.startsWith("/admin")) {
          return true;
        }
        // Vérifier le rôle admin pour les routes admin
        return token?.role === "ADMIN";
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
