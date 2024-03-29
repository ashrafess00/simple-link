import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";
import {singToken} from "@/app/lib/verifyToken";


export async function POST(req) {
    try {

        

        const { email, password } = await req.json();
        
        await dbConnect();
        
        const user = await User.findOne({email});
        
        if (user) {
            const checkedPass = await bcrypt.compare(password, user.password);
            
            if (checkedPass) {

                const token = await singToken(user);

                //set jwt to request coockie
                cookies().set({
                    name: 'access-token',
                    value: token,
                    
                    path: '/',
                });

                if (!user.verified)
                    return Response.json({message: "please verify you account"}, {status: 400});

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