'use server'
import { redirect } from 'next/navigation'
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

export async function logOut() {
    cookies().delete('access-token');
    redirect('/login');
}

//get user data from the token
export async function verifyAndGetUserData() {
    const token =  cookies().get('access-token')?.value;
    if (token) {
        const { payload } = await jwtVerify(token,
            new TextEncoder().encode(process.env.JWT_SECRET_KEY)
        );
        return payload;
    }
    else {
        throw new Error("invalid token");
    }
}

async function singTokenn() {

    const user = verifyAndGetUserData();

    try {
        const token = await new SignJWT({
            userId: user._id,
            userEmail: user.email,
            userUrls: user.userUrls,
            avatar: user.avatar,
            firstName: user.firstName,
            lastName: user.lastName,
            email2: user.email2,
        })
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY));
        return token;
    }
    catch(error) {
        throw new Error(error);
    }
}


export const saveNewTokenToCookie = async (user) => {
    const token = await singTokenn(user);

    cookies().set({
        name: 'access-token',
        value: token,
        path: '/',
    })
}