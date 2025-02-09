import { prisma } from "../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function createTestUser(overrides = {}) {
  const defaultRole = await prisma.role.create({
    data: {
      name: 'USERTest',
    },
  });

  const defaultData = {
    email: 'test@example.com',
    name: 'Test User',
    password: await bcrypt.hash('senha123', 10),
    profile: {
      create: {
        roleId: defaultRole.id,
        celular: '123456789',
        sexo: 'M',
        dataNascimento: new Date('2025-01-01'),
        curriculum: '',
        sobre: 'Usuário de teste',
        enderecos: {
          create: [{
            cep: '00000-000',
            rua: 'localhost',
            numero: 'localhost',
            complemento: 'localhost',
            estado: 'lh',
            municipio: 'localhost',
            bairro: 'localhost'
          }]
        },
        formacoes: {
          create: [{
            tipo_formacao: 'Teste',
            titulo_formacao: 'Teste',
            instituicao: 'Teste',
            data_conclusao: new Date('2030-01-01'),
          }]
        }
      }
    }
  };

  const userData = { ...defaultData, ...overrides };

  return await prisma.user.create({
    data: userData,
  });
}

export function createToken(userId: string): string {
    const secret = process.env.AUTH_SECRET || "test-secret";
    return jwt.sign({ sub: userId }, secret, { expiresIn: '1h' });
}

export async function clearDatabase() {
  await prisma.account.deleteMany();
  await prisma.formacao.deleteMany();
  await prisma.endereco.deleteMany();
  await prisma.planoAula.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
}