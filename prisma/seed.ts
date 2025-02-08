const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv/config');

const prisma = new PrismaClient();

async function checkIfUsersExist() {
  const userCount = await prisma.user.count();
  return userCount > 0;
}

async function main() {
  const hasUsers = await checkIfUsersExist();
  
  if (hasUsers) {
    console.log('Banco de dados já está populado. Seed não será executado.');
    return;
  }

  console.log('Iniciando seed do banco de dados...');

  const adminRole = await prisma.role.create({
    data: {
      name: 'ADMIN',
    },
  });

  const users = [
    { 
      name: process.env.NAME_STRING || "Admin User",
      email: process.env.EMAIL_STRING || "admin@example.com",
      password: process.env.ADMIN_PASSWORD || "adminpassword",
      profile: {
        roleId: adminRole.id,
        celular: "123456789",
        sexo: "M",
        dataNascimento: new Date("2025-01-01"),
        curriculum: "",
        sobre: "Usuário administrador",
        enderecos: {
          create: [{
            cep: "00000-000",
            rua: "localhost",
            numero: "localhost",
            complemento: "localhost",
            estado: "lh",
            municipio: "localhost",
            bairro: "localhost"
          }]
        },
        formacoes: {
          create: [{
            tipo_formacao: "Admin Sistema",
            titulo_formacao: "ADS",
            instituicao: "Universidade localhost",
            data_conclusao: new Date("2030-01-01"),
            escola: "Escola localhost"
          }]
        }
      }
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        profile: {
          create: {
            roleId: user.profile.roleId,
            celular: user.profile.celular,
            sexo: user.profile.sexo,
            dataNascimento: user.profile.dataNascimento,
            curriculum: user.profile.curriculum,
            sobre: user.profile.sobre,
            // Nested writes para criar o(s) endereço(s) e formação(ões)
            enderecos: user.profile.enderecos,
            formacoes: user.profile.formacoes,
          }
        }
      },
    });
  }

  console.log('Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao executar seed:', e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
