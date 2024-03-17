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
    const {client, bucket } = await dbConnect();
    const userJwt = cookies().get("access-token")?.value;
    const { userId } = await verifyToken(userJwt);
    const user = await User.findById(userId);
    let name;
    let image;

    console.log(user);

    
    if (user) {
        const data = await req.formData();
        const userInfo = await req.json();
        try {
            for (const entry of Array.from(data.entries())) {
                const [key, value] = entry;
    
                console.log(key);
                const isFile = typeof value === "object";
    
                if (isFile) {
                    const blob = value;
                    const filename = Date.now() + "_" + blob.name;
    
                    //convert blob to stream
                    const buffer = Buffer.from(await blob.arrayBuffer());
                    const stream = Readable.from(buffer);
                    const uploadStreeam = bucket.openUploadStream(filename, {
                        contentType: blob.type,
                        metadata: {
                            userId: userId,
                        },
                    })
    
                    await uploadStreeam.write(buffer);
                    uploadStreeam.end();
                    name = filename;
                }
            }
            
            // after uploading the new image, we should delete the old one
            if (user.avatar) {
                try {
                const files = await bucket.find({filename: user.avatar})
                .toArray()
    
                // console.log(files);
                    if (files.length > 0) {
                        const file = files[0];
                        bucket.delete(file._id);
                    }
                }
                catch (error) {
                    console.log("there is an error");
                }
            }

            user.avatar = name;
            const res = await user.save();
            await saveNewTokenToCookie(user);
            return Response.json({avatar: res.avatar});
        }
        catch(error) {
            return Response.json({message: "there is an error"}, {status: 500})
        }


        
        
    }
    else {
        return Response.json({message: 'no user'}, {status: 400});
    }

}
