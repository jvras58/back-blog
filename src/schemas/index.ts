import * as z from "zod";

export const CredentialsSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Por favor insira um endereço de e-mail válido",
  }),
  name: z.string().min(1, {
    message: "O nome é obrigatório",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres",
  }),
  passwordConfirmation: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres",
  }),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  });

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Por favor insira um endereço de e-mail válido",
  }),
  password: z.string().min(1, {
    message: "Por favor insira uma senha válida",
  }),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "Por favor insira um endereço de e-mail válido",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres",
  }),
  passwordConfirmation: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres",
  }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "As senhas não coincidem",
  path: ["passwordConfirmation"],
});
