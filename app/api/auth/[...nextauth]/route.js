
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { mongooseConnect } from "@/lib/mongoose";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";


const authOptions = {
  providers: [
    GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        
        const {email, password} = credentials;
        try {
            await mongooseConnect();
            const user = await User.findOne({email});
            if (!user) {
              return null;
            }
            const passwordsMatch = await bcrypt.compare(password, user.password);

            if (!passwordsMatch) {
              return null;
            }
            return user;
        } catch (error) {
          console.log("Error: ", error)
        }
      },
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};




// import clientPromise from "@/lib/mongodb";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),

//   ],
//   adapter: MongoDBAdapter(clientPromise),
//   secret: process.env.NEXTAUTH_SECRET,

// });

// export { handler as GET, handler as POST}

