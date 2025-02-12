import Google from "@auth/express/providers/google"
import Credentials from "@auth/express/providers/credentials"
import { compare } from "bcryptjs";
import { CredentialsSchema } from "../schemas";
import { findUserByEmail } from "../services";

 // TODO: Qual ´é o melhor? aqui ou no auth.ts usando o ExpressAuthConfig? 
export default {
    providers: [
        Google({}),
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
    ]
};