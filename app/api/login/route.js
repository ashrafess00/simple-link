import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        
        await dbConnect();
        
        const user = await User.findOne({email});
        
        if (user) {
            const checkedPass = await bcrypt.compare(password, user.password);
            
            if (checkedPass) {

                const token = await jwt.sign({
                    userId: user._id,
                    userEmail: user.email,
                },
                process.env.JWT_SECRET_KEY,
                {expiresIn: "24h"}
                )
                console.log(token);

                return Response.json({message: "Login Successful", email:user.email, token})
            }
            else {
                return Response.json({message: "password doesn't match"}, {
                    status: 400
                });

            }
        }


        else {
            return Response.json({message: "User Not Found"});
        }

    }
    catch(error) {
        return Response.json({ error: error.message }, {status: 500});
    }
}