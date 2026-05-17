import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('AUTH-TOKEN')?.value;
    const reset = request.cookies.get('reset')?.value === 'true';
    const currentPath = request.nextUrl.pathname;
    const rutasSinAutenticacion = [
        '/login',  
        '/forgot-password', 
        '/verify-code', 
        '/reset-password'
    ];
    if(!token && !rutasSinAutenticacion.includes(currentPath)){
        const loginUrl = new URL("/login", request.url)
        return NextResponse.redirect(loginUrl);
    }
    if(token && rutasSinAutenticacion.includes(currentPath)){
        const dashboardUrl = new URL("/instructor-seguimiento/dashboard", request.url)
        return NextResponse.redirect(dashboardUrl);
    }
    if(!reset && currentPath === "/reset-password"){
        const loginUrl = new URL("/login", request.url)
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
    ],
};