import { cookies } from "next/headers";
// import  verifyToken  from "./app/lib/verifyToken";
// import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
import verifyToken from "./app/lib/verifyToken";


export async function middleware(req) {
    const value = cookies().get('access-token')?.value;
    try {
        await verifyToken(value);
        if (req.nextUrl.pathname == '/login')
            return Response.redirect(new URL('/dashboard', req.url));
        if (req.nextUrl.pathname == '/register')
            return Response.redirect(new URL('/dashboard', req.url));
    }
    catch(error) {

        return Response.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/dashboard', '/preview',]
}