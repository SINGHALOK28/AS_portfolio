import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  // Only protect the /admin route
  if (url.pathname.startsWith('/admin')) {
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // Check credentials against the secure passcode
      if (user === 'admin' && pwd === 'alok1701') {
        return NextResponse.next();
      }
    }
    
    // Return 401 and prompt for authentication if failed or no auth header
    return new NextResponse('Authentication Required: Enter your Admin credentials.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Secure Terminal"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
