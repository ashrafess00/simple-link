import { cookies } from "next/headers";
// import  verifyToken  from "./app/lib/verifyToken";
// import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
import verifyToken from "./app/lib/verifyToken";


export async function middleware(req) {
    const value = cookies().get('access-token')?.value;
    try {
        await verifyToken(value);
        console.log("hi: ", req.nextUrl.pathname);
        if (req.nextUrl.pathname == '/login')
            return Response.redirect(new URL('/testpage', req.url));
    }
    catch(error) {
        return Response.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: '/testpage/:path*'
}