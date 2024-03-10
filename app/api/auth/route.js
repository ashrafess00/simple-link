import { cookies } from "next/headers"

export async function POST(req) {
    const l = cookies().get("access-token")?.value;
    return Response.json({l})
}