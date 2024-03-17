import { singToken } from "./verifyToken";
import { cookies } from "next/headers";


export const saveNewTokenToCookie = async (user) => {
    console.log("i am : ", user);
    
    // console.log()
    const token = await singToken(user);

    // console.log(token);
    cookies().set({
        name: 'access-token',
        value: token,
        path: '/',
    })
}