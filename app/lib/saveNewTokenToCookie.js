import { singToken } from "./verifyToken";
import { cookies } from "next/headers";


export const saveNewTokenToCookie = async (user) => {

    
    const token = await singToken(user);

    cookies().set({
        name: 'access-token',
        value: token,
        path: '/',
    })
}