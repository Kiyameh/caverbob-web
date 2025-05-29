import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {createBrowserClient} from '@/lib/supabase'

export async function middleware(request: NextRequest) {
  return NextResponse.next()
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [],
}
