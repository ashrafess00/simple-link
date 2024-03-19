import { getUrlCom, listMenu } from "@/app/utils/listMenu";
import Ji from "./Com";
import dbConnect from "@/app/lib/dbConnect";
import verifyToken from "@/app/lib/verifyToken";
import User from "@/app/models/User";

import Image from "next/image";
import { cookies } from "next/headers";
import UrlContainer from "@/app/ui/UrlContainer";


export default async function Preview({params}) {

    await dbConnect();

    let userUrls, avatar, canEdit, firstName, lastName, email2;
    const {id} = params;
    const user = await User.findById(id);
    if (user) {
        userUrls = user.userUrls;
        avatar = user.avatar;
        firstName = user.firstName;
        lastName = user.lastName;
        email2 = user.email2;
    }


    const value = cookies().get('access-token')?.value;
    if (value) {
        const userFromCookie = await verifyToken(value);
        canEdit = userFromCookie.userId === id;
    }

    return (
        <>
            <nav className="md:pt-8 md:px-8 md:relative md:block md:bg-violet-1 md:h-[25rem] md:w-full md:rounded-b-[3rem]">
                {canEdit && <Ji />}

                <div className="shadow-xl md:p-20 bg-white rounded-lg mt-32 flex flex-col justify-center items-center p-8 max-w-md mx-auto">

                    <Image alt="avatar" className="mb-2 border-violet-1 border-8 rounded-full w-32 h-32" src={"/api/" + avatar} width={250} height={250} />
                    <h3 className="text-2xl font-bold">
                    {
                        (firstName !== "" && lastName !== "")
                        ? firstName + " " + lastName
                        : ""
                    }
                    </h3>
                    <h4 className="mb-8">
                        {email2 !== "" ? email2 : ""}
                    </h4>
                    {
                        userUrls.map((e, index) => {
                            const {style, logo} = getUrlCom(e.name);
                            return (
                                <a key={index} href={e.url} target="_blank" className="w-full">
                                    <UrlContainer style={style} url={e.name} logo={logo} />
                                </a>
                            )
                        })
                    }
                </div>
            </nav>




        </>
    )
}

