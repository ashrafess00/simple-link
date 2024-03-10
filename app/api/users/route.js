import dbConnect from "@/app/lib/dbConnect";
import verifyToken from "@/app/lib/verifyToken";
import User from "@/app/models/User";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

await dbConnect();

export async function GET(req) {

    try {
        const jwt = cookies().get('access-token')?.value;
        const {userId} = await verifyToken(jwt);
        const user = await User.findById(userId);

        if (user) {
            return Response.json(user);
        }
        return Response.json({user});
    }
    catch(error) {
        console.log(error);
        return Response.json({success: false});
    }
}

export async function DELETE(req) {
    await dbConnect();
    return Response.json({hello: "hello"});
}