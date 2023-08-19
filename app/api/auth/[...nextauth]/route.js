
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

  ],
  adapter: MongoDBAdapter(clientPromise),

});

export { handler as GET, handler as POST}





// import { MongoDBAdapter } from '@auth/mongodb-adapter';
// import NextAuth from 'next-auth';
// import GoogleProvider from "next-auth/providers/google";
// import clientPromise from '@../../lib/mongodb';

// const adminEmails = ['liverpoolscores09@gmail.com'];

// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET
//     }),
// ],
// adapter: MongoDBAdapter(clientPromise),
// secret: process.env.NEXTAUTH_SECRET,
// callbacks: {
//     session: ({session, token, user}) => {
//         if (adminEmails.includes(session?.user?.email)) {
//             return session;
//         } else {
//             return false;
//         }
//     }
//     // async jwt({ token, account, profile }) {
//     //     console.log("ACCOUNT", token)
//         // Persist the OAuth access_token and or the user id to the token right after signin
//         // if (account) {
//         //   token.accessToken = account.access_token
//         //   token.id = profile.id
//         // }
//         // return token
//     // }
// }
// })

// export { handler as GET, handler as POST}



// export const authOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET
//     }),
// ],
// adapter: MongoDBAdapter(clientPromise),
// secret: process.env.NEXTAUTH_SECRET,
// callbacks: {
//     session: ({session, token, user}) => {
//         if (adminEmails.includes(session?.user?.email)) {
//             return session;
//         } else {
//             return false;
//         }
        
//     }
// }
// }

// export default NextAuth(authOptions);




// export default NextAuth({
//     providers: [
//                 GoogleProvider({
//                     clientId: process.env.GOOGLE_CLIENT_ID,
//                     clientSecret: process.env.GOOGLE_CLIENT_SECRET
//             }),
//         ],
//         adapter: MongoDBAdapter(clientPromise)
// })


// import { authenticate } from "@/services/authService"
// import NextAuth from "next-auth"
// import { AuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"


// export const authOptions = {
//   providers: [
//     GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize (credentials, req) {
//         if (typeof credentials !== "undefined") {
//           const res = await authenticate(credentials.email, credentials.password)
//           if (typeof res !== "undefined") {
//             return { ...res.user, apiToken: res.token }
//           } else {
//             return null
//           }
//         } else {
//           return null
//         }
//       }
//     })
//   ],
//   session: { strategy: "jwt" }
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }