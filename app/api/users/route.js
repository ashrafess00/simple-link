import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";

export async function GET(req) {
    await dbConnect();
    try {
        const users = await User.find({});
        console.log(users);
        return Response.json({success: true, data: users});
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