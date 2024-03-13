import dbConnect from "@/app/lib/dbConnect";
import verifyToken from "@/app/lib/verifyToken";
import User from "@/app/models/User";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

await dbConnect();

export async function GET(req) {

    try {
        const jwt = cookies().get('access-token')?.value;
        const data = await verifyToken(jwt);
        // const user = await User.findById(userId);

        console.log(data)
        if (data) {
            return Response.json(data);
        }
        return Response.json({error: "error"});
    }
    catch(error) {
        console.log(error);
        return Response.json({success: error}, {status: 400});
    }
}

export async function DELETE(req) {
    await dbConnect();
    return Response.json({hello: "hello"});
}