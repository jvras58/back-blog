import Google from "@auth/express/providers/google"
import Credentials from "@auth/express/providers/credentials"
import { ExpressAuthConfig } from "@auth/express";
import { CredentialsSchema } from "./src/schemas";
import { findUserByEmail } from "./src/services";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./src/lib/db";
import { compare } from "bcryptjs";

export const authConfig: ExpressAuthConfig = {
  adapter: PrismaAdapter({ prisma }),
  session: { strategy: "jwt" },
  providers: [
    Google({}),
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const validatedCredentials = CredentialsSchema.safeParse(credentials);
        if (validatedCredentials.success) {
            const { email, password } = validatedCredentials.data;
            const user = await findUserByEmail(email);
            if (!user || !user.password) {
                throw new Error("Credenciais inválidas");
            }
            const validPassword = await compare(password, user.password);
            if (validPassword) return user;
        }
        return null;
    },
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        // Adiciona a propriedade `id` ao objeto de usuário da sessão
        session.user.id = token.sub; // `token.sub` contém o ID do usuário
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        //Adiciona o ID do usuário ao JWT
        token.sub = user.id;
      }
      return token;
    },
  },
};