import Google from "@auth/express/providers/google"
import Credentials from "@auth/express/providers/credentials"
import { ExpressAuthConfig } from "@auth/express";
import { CredentialsSchema } from "./src/schemas";
import { findUserByEmail } from "./src/services";
import { compare } from "bcryptjs";

declare module "@auth/express" {
  interface Session {
    user: {
      id: string;
    };
  }
}

export const authConfig: ExpressAuthConfig = {
  providers: [
    Google({}),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        console.log("Iniciando processo de autorização");
        try {
          console.log("Validando credenciais...");
          const validatedCredentials = CredentialsSchema.safeParse(credentials);
  
          if (!validatedCredentials.success) {
            console.log("Falha na validação das credenciais");
            throw new Error("Credenciais inválidas");
          }
  
          const { email, password } = validatedCredentials.data;
          console.log(`Buscando usuário com email: ${email}`);
          const user = await findUserByEmail(email);
  
          if (!user || !user.password) {
            console.log("Usuário não encontrado ou senha inexistente");
            throw new Error("Email não encontrado");
          }
  
          console.log("Comparando senha fornecida com a senha armazenada");
          const isValidPassword = await compare(password, user.password);
  
          if (!isValidPassword) {
            console.log("Senha incorreta");
            throw new Error("Senha incorreta");
          }
  
          console.log("Autorização bem-sucedida, usuário autenticado");
          return user;
        } catch (error) {
          console.log("Erro na autorização:", error instanceof Error ? error.message : error);
          throw new Error(error instanceof Error ? error.message : "Erro na autenticação");
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      console.log("Callback session iniciado");
      if (token.sub) {
        session.user.id = token.sub; // token.sub contém o ID do usuário
        console.log(`Sessão configurada com usuário ID: ${token.sub}`);
      }
      return session;
    },
    async jwt({ token, user }) {
      console.log("Callback JWT iniciado");
      if (user) {
        token.sub = user.id;
        console.log(`Token JWT atualizado com usuário ID: ${user.id}`);
      }
      return token;
    },
  },
};