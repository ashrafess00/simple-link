import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import {singToken} from "@/app/lib/verifyToken";

import verifyToken from "@/app/lib/verifyToken";

import {Readable} from "stream";
import { saveNewTokenToCookie } from "@/app/lib/saveNewTokenToCookie";


export async function POST(req) {

    await dbConnect();
    const userJwt = cookies().get("access-token")?.value;
    const { userId } = await verifyToken(userJwt);
    let name;
    let image;
    
    
    
    const user = await User.findById(userId);
    if (user) {
        try {
            const {firstName, lastName} = await req.json();
            if (!firstName || !lastName)
                return Response.json({message: 'please include firstName and lastName'}, {status: 400})
            user.firstName = firstName;
            user.lastName = lastName;
            const result = await user.save();
            return Response.json({message: 'first name and last name saved', result}, {status: 201});

            // return Response.json({user})
        }
        catch(error) {
            return Response.json({message: "there is an error"}, {status: 500})
        }


        
        
    }
    else {
        return Response.json({message: 'no user'}, {status: 400});
    }

}
