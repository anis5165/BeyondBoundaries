import { NextResponse } from 'next/server'

export function middleware(request) {
    const token = request.cookies.get('token')?.value;
    const path = request.nextUrl.pathname;

    if (!token && (path.startsWith('/businessOwnerDetailsForm') || path.startsWith('/partnerDetailsForm'))) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/businessOwnerDetailsForm/:path*', '/partnerDetailsForm/:path*']
}