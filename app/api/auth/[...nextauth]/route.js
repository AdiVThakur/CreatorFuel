import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDB from "@/db/connectDb";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github") {
        await connectDB(); // 👈 Connect to MongoDB first

        const currentUser = await User.findOne({ email: user.email });

        if (!currentUser) {
          const newUser = new User({
            email: user.email,
            Username: user.email.split("@")[0],
          });
          await newUser.save();
        } 
        return true;
      }
      return true;
    },
    async session({ session }) {
      await connectDB(); // 👈 Connect to MongoDB first

      const dbuser = await User.findOne({ email: session.user.email });
      if (dbuser) {
        session.user.name = dbuser.Username;
      }

      return session;
    }
  },
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };