import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const user = request.cookies.get("user")?.value || null;

  const isAuthPage = request.nextUrl.pathname.startsWith("/(auth)");
  const isPrivatePage = request.nextUrl.pathname.startsWith("/dashboard");

  // se não estiver logado e tentar acessar página privada
  if (!user && isPrivatePage) {
    return NextResponse.redirect(new URL("/(auth)/login", request.url));
  }

  // se estiver logado e tentar acessar login/cadastro
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(auth)/:path*", "/dashboard/:path*"],
};
