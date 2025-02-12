import Google from "@auth/express/providers/google"
import Credentials from "@auth/express/providers/credentials"
import { ExpressAuthConfig } from "@auth/express";
import { CredentialsSchema } from "./src/schemas";
import { findUserByEmail } from "./src/services";
import { compare } from "bcryptjs";


// TODO: Qual ´é o melhor? aqui ou nos routes e controles de auth? 
declare module "@auth/express" {
  interface Session {
    user: {
      id: string;
    };
  }
}
 
export const authConfig: ExpressAuthConfig = {
  providers: [Google({}),
            Credentials({
            credentials: {
                email: {},
                password: {},
                },
                async authorize(credentials) {
                    try {
                        const validatedCredentials = CredentialsSchema.safeParse(credentials);
                        
                        if (!validatedCredentials.success) {
                            throw new Error("Credenciais inválidas");
                        }
    
                        const { email, password } = validatedCredentials.data;
                        
                        const user = await findUserByEmail(email);
                        
                        if (!user || !user.password) {
                            throw new Error("Email não encontrado");
                        }
    
                        const isValidPassword = await compare(password, user.password);
                        
                        if (!isValidPassword) {
                            throw new Error("Senha incorreta");
                        }
    
                        return user;
                    } catch (error) {
                        throw new Error(error instanceof Error ? error.message : "Erro na autenticação");
                    }
                }
            })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        // Add the `id` property to the session user object
        session.user.id = token.sub; // `token.sub` contains the user ID
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // Add the user ID to the JWT
        token.sub = user.id;
      }
      return token;
    },
  },
};