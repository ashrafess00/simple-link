import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: 'Email', type: 'email' },
            password: { label: 'Password', type: 'password' },
          },
          async authorize(credentials) {
            const user = {id: 1, name: 'ashraf'};
            if (user) {
                console.log(user);
              return { user }
            } else {
              throw new Error('Invalid credentials')
            }
          },
        }),
      ],
})

export {handler as GET, handler as POST};