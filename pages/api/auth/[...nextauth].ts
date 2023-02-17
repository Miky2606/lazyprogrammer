import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { uuid } from "uuidv4";

import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { createFolder } from "../../../controller/controller_fs";
import { IMail, sendMail } from "../../../controller/controller_mail";
import clientPromise from "../../../db/connect_db";
import Templates from "../../../db/schema/templates_schema";
import USER from "../../../db/schema/user_schema";
import { IUser } from "../../../interface/user_interface";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    signIn: async ({ user }) => {
      const users = user as IUser;

      users.code_auth = uuid();

      try {
        const mail: IMail = {
          fromMail: "jonathanjgn99@gmail.com",
          toMail: user.email!,
          subject: "Logged",
          message: "Welcome",
        };
        createFolder(user.name!);
        // sendMail(mail);
      } catch (error) {
        console.log(error);
      }
      return true;
    },
    session: async ({ session, token, user }) => {
      const users = user as IUser;
      if (session?.user) {
        let userNew: IUser = {
          id: user.id,
          email: user.email!,
          name: user.name!,
          expires: session.expires,
          image: user.image,
          code_auth: users.code_auth,
        };

        return userNew;
      }
      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
};
export default NextAuth(authOptions);
