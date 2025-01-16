const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
require('dotenv/config');

// TODO: PARA ME EXECUTAR: 
// npm run seed
// ERRO Cannot find module: dotenv/bcrypt:
// npm install dotenv
// npm install bcrypt

const prisma = new PrismaClient();

async function main() {
  const users = [
    { 
      name: process.env.NAME_STRING, 
      email: process.env.EMAIL_STRING, 
      password: process.env.ADMIN_PASSWORD,
      role: "ADMIN"
    }
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const userData = {
      name: user.name,
      password: hashedPassword,
      email: user.email,
      role: user.role,
    };

    await prisma.user.create({
      data: userData,
    });
  }

    const mockPosts = [
        {
        id: "1",
        author: {
            id: "author1",
            name: "John Doe"
        },
        title: "Introdução ao React",
        description: "Uma introdução ao React para iniciantes",
        content: "React é uma biblioteca JavaScript popular para construção de interfaces de usuário. Ele permite que os desenvolvedores criem componentes de UI reutilizáveis ​​que podem ser compostos para construir aplicativos complexos. Neste post, abordaremos os fundamentos do React, incluindo componentes, props e estado.",
        category: "Frontend",
        tags: ["React", "JavaScript", "Web Development"],
        createdAt: "2023-05-15"
        },
        {
            id: "2",
            author: {
              id: "author2",
              name: "Jane Smith"
            },
            title: "O poder do Tailwind CSS",
            description: "Como Tailwind CSS pode acelerar seu processo de desenvolvimento",
            content: "Tailwind CSS é uma estrutura CSS utilitária que fornece classes utilitárias de baixo nível para construir designs personalizados. Ele permite o desenvolvimento rápido da UI sem sair do HTML. Esta postagem explora como o Tailwind pode acelerar significativamente seu processo de desenvolvimento e tornar suas folhas de estilo mais fáceis de manter.",
            category: "CSS",
            tags: ["CSS", "Tailwind", "Web Design"],
            createdAt: "2023-05-20"
        },
    ]
  for (const post of mockPosts) {
    await prisma.post.create({
      data: {
        id: post.id,
        title: post.title,
        description: post.description,
        content: post.content,
        category: post.category,
        tags: post.tags,
        createdAt: new Date(post.createdAt),
        author: {
          connect: { id: post.author?.id }
        }
      }
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });