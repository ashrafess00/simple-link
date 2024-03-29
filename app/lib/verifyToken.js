import { jwtVerify, SignJWT } from "jose";

export async function singToken(user) {
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

export default async function verifyToken(token) {
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