import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the session token
  const { data: { user } } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Studio routes protection (except login and unauthorized pages)
  const isStudioRoute = pathname.startsWith("/studio");
  const isStudioLogin = pathname === "/studio/login";
  const isStudioUnauthorized = pathname === "/studio/unauthorized";

  if (isStudioRoute && !isStudioLogin && !isStudioUnauthorized) {
    if (!user) {
      // No session — redirect to login
      const loginUrl = new URL("/studio/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If user is already logged in and visits /studio/login, redirect to dashboard
  if (isStudioLogin && user) {
    const dashboardUrl = new URL("/studio", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
