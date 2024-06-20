import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token && req.nextUrl.pathname.startsWith('/book')) {
    return NextResponse.redirect(
      new URL('/auth/login?callbackUrl=/book', req.url)
    );
  }

  if (token && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (token && !token.isAdmin && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/access-denied', req.url));
  }

  if (!token && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(
      new URL('/auth/login?callbackUrl=/admin', req.url)
    );
  }

  return NextResponse.next();
}
