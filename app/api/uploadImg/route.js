import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import {singToken} from "@/app/lib/verifyToken";

import verifyToken from "@/app/lib/verifyToken";

import {Readable} from "stream";


export async function POST(req) {

    try {
        const {client, bucket } = await dbConnect();
        const data = await req.formData();

        const userJwt = cookies().get("access-token")?.value;
        const { userId } = await verifyToken(userJwt);

        let name;
        let image;

        for (const entry of Array.from(data.entries())) {
            const [key, value] = entry;

            console.log(key ,"-", value);
            const isFile = typeof value === "object";
            
            if (isFile) {
                const blob = value;
                const filename = Date.now() + blob.name;

                //i will check if file exists

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

        await User.updateOne({ _id: userId }, { $set: { 'avatar': name } });

        return Response.json({data});
    }
    catch(error) {
        return Response.json({error})
    }
    // try {
    //     //verify user
    //     const userJwt = cookies().get("access-token")?.value;
    //     const { userId } = await verifyToken(userJwt);


    //     await dbConnect();
    //     const user = await User.findById(userId);


    //     return Response.json({userId});
    // }
    // catch(error) {
    //     return Response.json({error}, {status: 400});
    // }
}