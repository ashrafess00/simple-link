import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
    const { method } = req;
    if (method === 'POST') {
        User.findOne({email: req.body.email})
        .then((user) => {
            bcrypt.compare(request.body.password, user.password)
            .then((password) => {
                if (!password) {
                    return res.status(400).send({
                        message: "password doesn't match",
                        error,
                    })
                }


                //create now the token
                const token = jwt.sign(
                    {
                        userId: user._id,
                        userEmail: user.email,
                    }
                )
            })
            .catch((error) => {
                res.status(400).send({
                    message: "password is not correct",
                    error
                })
            })
        })
        .catch((error) => {
            res.status(404).send({
                message: "Email Not Found",
                error
            })
        })
    }
    else {
        res.status(400).send({status: "method not allowed"})
    }
}