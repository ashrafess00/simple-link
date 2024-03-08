import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import bcrypt from 'bcrypt'
import { Result } from "postcss";


export default async function handler(req, res) {
    const { method } = req;

    if (method === 'POST') {
        const { email, password } = req.body;
        
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const user = new User({
                email: email,
                password: hashedPassword
            })

            const result = await user.save()
            res.status(201).send({
                message: "user created successfully",
                result
                
            })
        }
        catch(error) {
            res.status(500).send({
                message: error.message,
                error,
            })
        }
    }
    else {
        res.status(405).json({status: "method not allowed"});
    }

    



}