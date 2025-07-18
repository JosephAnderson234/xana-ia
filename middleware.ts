import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
    console.log("✅ Middleware ejecutado en:", req.nextUrl.pathname)
    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*", "/admin", "/admin/:path*"],
}
