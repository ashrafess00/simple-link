import User from "@/app/models/User";
import Link from "next/link";


export default async function VerifyToken({params}) {
    try {
        const user = await User.findOne({_id:params.userid});
        if (!user)
            return <h1>no user</h1>
        if (user.token !== params.token)
            return <h1>Invalid Link</h1>;

        user.verified = true;

        //token must be removed
        await user.save();
    }
    catch(error) {
        return <h1 className="text-2xl font-extrabold text-center mt-20">An Error was occured, sorry :(</h1>;
    }
    
    return (
        <div className="w-full">
            <p className="text-2xl text-[green] font-extrabold text-center mt-20">your email was verified :)</p>
            <a href="/login" className="btn-secondary mt-5 mx-auto block w-fit">go back to login</a>
        </div>
    )
}