'use server'
import nodemailer from "nodemailer";
import dbConnect from "./dbConnect";
import User from '@/app/models/User';

export const sendEmail = async (email, subject, verifyLink) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    await transporter.sendMail({

        
        from: "Ashraf-Test",
        to: email,
        subject: subject,
        html: `
            <h2>Hello there User</h2>
            <p>first i would like to thank you for using this app <3</p>
            <p>please click this link to confirm your account</p>
            <a href="${verifyLink}">${verifyLink}</a>
        `,
    })
}

export const resendVerificationLink = async (userId) => {
    await dbConnect();
    const user = await User.findById(userId);

    if (user) {
        const email = user.email;
        let verifyLink;
        if (user.token)
            verifyLink = `${process.env.BASE_URL}/verify/${userId}/${user.token}`; 
        else
        {
            user.token = crypto.randomBytes(32).toString("hex");
            verifyLink = `${process.env.BASE_URL}/verify/${userId}/${user.token}`; 
        }
        sendEmail(email, "email verification", verifyLink);
    }
}