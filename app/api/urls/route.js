import dbConnect from "@/app/lib/dbConnect";
import verifyToken from "@/app/lib/verifyToken";
import User from "@/app/models/User";
import { cookies } from "next/headers";

//add links
export async function POST(req) {
    try {
        const {urlsToBeAdded} = await req.json();
        const userJwt = cookies().get("access-token")?.value;
        const { userId } = await verifyToken(userJwt);


        await dbConnect();
        const user = await User.findById(userId);
        console.log(user);
        if (user) {

            urlsToBeAdded.map(url => {
                user.userUrls.push(url);
            })
            const result = await user.save();
            return Response.json({message: "url were saved", result});
            // return Response.json({message: urlsToBeAdded});
        }
        else {
            return Response.json({message: "there is no user with the email"}, 
            {
                status: 401
            });
        }
    }
    catch(error) {
        console.log("error: ", error);
        return Response.json({error});
    }
}

export async function DELETE(req) {
    const {urlsToBeDeleted} = await req.json();
    const userJwt = cookies().get("access-token")?.value;
    const { userId } = await verifyToken(userJwt);
}

