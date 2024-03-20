import dbConnect from "@/app/lib/dbConnect";
import { saveNewTokenToCookie } from "@/app/lib/saveNewTokenToCookie";
import verifyToken from "@/app/lib/verifyToken";
import User from "@/app/models/User";
import { cookies } from "next/headers";

//add links


export async function POST(req) {
    try {
        const urlsToBeAdded = await req.json();
        const userJwt = cookies().get("access-token")?.value;
        const { userId } = await verifyToken(userJwt);

        await dbConnect();
        const user = await User.findById(userId);
        if (user) {

            user.userUrls = urlsToBeAdded;
            const result = await user.save();
            
            //new jwt with new data
            await saveNewTokenToCookie(user);
            return Response.json({message: "Urls were saved"}, {result: "f"});
        }
        else {
            return Response.json({message: "there is no user with the email"}, 
            {
                status: 401
            });
        }
    }
    catch(error) {
        return Response.json({error}, {status: 500});
    }
}

export async function PUT(req) {
    try {
        const urlsToBeEdited = await req.json();
        const userJwt = cookies().get("access-token")?.value;
        const { userId } = await verifyToken(userJwt);

        const user = await User.findById(userId);
        if (user) {

            urlsToBeEdited.map(async (urlToBeAddedArr) => {
                const urlToBeAddedFromDb = await user.userUrls.id(urlToBeAddedArr._id);
                if (urlToBeAddedFromDb) {
                    urlToBeAddedFromDb.name = urlToBeAddedArr.name;
                    urlToBeAddedFromDb.url = urlToBeAddedArr.url;
                }
            })

            const result = await user.save();
            //new jwt with new data
            await saveNewTokenToCookie(user);
            return Response.json({message: "Urls were Edited"}, result);
        }
        else {
            return Response.json({message: "there is no user with the email"}, 
            {
                status: 401
            });
        }
    }
    catch(error) {
        return Response.json({error}, {status: 500})
    }
}

export async function DELETE(req) {
    const urlsToBeDeleted = await req.json();
    const userJwt = cookies().get("access-token")?.value;
    const { userId } = await verifyToken(userJwt);

    const user = await User.findById(userId);
    if (user) {
        urlsToBeDeleted.map(async (urlToBeDeletedArr) => {
            const urlToBeDeletedDb = await user.userUrls.id(urlToBeDeletedArr._id);
            const index = user.userUrls.indexOf(urlToBeDeletedDb);
            if (index > -1)
                user.userUrls.splice(index, 1);
        })

        const result = await user.save();
        //new jwt with new data
        await saveNewTokenToCookie(user);
        return Response.json({message: "urls deleted successfully", result})
    }
    else {
        return Response.json({message: "user not found"}, {status: 400})
    }
}

