import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import {singToken} from "@/app/lib/verifyToken";
export async function POST(req) {
    try {
        const { email, password } = await req.json();
        
        await dbConnect();
        
        const user = await User.findOne({email});
        
        if (user) {
            const checkedPass = await bcrypt.compare(password, user.password);
            
            if (checkedPass) {
                // const token = await new SignJWT({
                //     userId: user._id,
                //     userEmail: user.email,
                // })
                // .setProtectedHeader({alg: 'HS256'})
                // .setIssuedAt()
                // .setExpirationTime('24h')
                // .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY));

                const token = await singToken(user);
                // console.log("token: ", token);

                //set jwt to request coockie
                cookies().set({
                    name: 'access-token',
                    value: token,
                    httpOnly: true,
                    path: '/',
                })

                return Response.json({message: "Login Successful",  token})
            }
            else {
                return Response.json({message: "password doesn't match"}, {
                    status: 400
                });

            }
        }


        else {
            return Response.json({message: "User Not Found"}, {status: 400});
        }

    }
    catch(error) {
        return Response.json({ error: error.message }, {status: 500});
    }
}