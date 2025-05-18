import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';

const publicRoutes = [
  { path: '/', whenAuthenticated: 'redirect' },
  { path: '/auth', whenAuthenticated: 'redirect' }
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicRoute = publicRoutes.find((route) => route.path === pathname);
  const token = request.cookies.get(
    process.env.NEXT_PUBLIC_COOKIE_NAME || 'token'
  );
  const redirectUrl = request.nextUrl.clone();

  if (!token && publicRoute) {
    return NextResponse.next();
  }

  if (!token && !publicRoute) {
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  if (token && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
    redirectUrl.pathname = '/app';
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ['/', '/auth', '/app/:path*']
};
