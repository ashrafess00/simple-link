import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        cookies().delete('access-token');
        return Response.redirect(new URL('/login', req.url));
    }
    catch(error) {
        return Response.redirect(new URL('/login', req.url));
    }
}