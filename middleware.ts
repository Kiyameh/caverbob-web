import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createBrowserClient } from "@/lib/supabase"

// List of paths that require authentication
const protectedPaths = [
  "/profile",
  // Add more protected paths as needed
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

  if (isProtectedPath) {
    // Get the session from the request cookie
    const supabase = createBrowserClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If no session, redirect to the home page
    if (!session) {
      const redirectUrl = new URL("/", request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.next()
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    "/profile/:path*",
    // Add more paths as needed
  ],
}
