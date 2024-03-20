import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import { sendEmail } from "@/app/lib/sendEmail";

export async function POST(req) {
    const requestBody = await req.json();
    const { email, password } = requestBody;

    await dbConnect();
    
    try {

        const eUser = await User.findOne({email});
        if (eUser) {
            return Response.json({message: "Email already exists"}, {status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        

        const user = new User({
            email: email,
            password: hashedPassword,
            token: crypto.randomBytes(32).toString("hex"),
        })

        const verifyLink = `http://localhost:3000/verify/${user._id}/${user.token}`;
        await sendEmail("yopakiw157@dovesilo.com", "VerifyLink", verifyLink);
        const result = await user.save();
        return Response.json({message: "user created successfully", result})
    }
    catch(error) {
        return Response.json({message: error.message, error}, {
            status: 400
        })
    }

}