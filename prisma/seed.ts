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
}

main()
.catch((e) => {
throw e;
})
.finally(async () => {
await prisma.$disconnect();
});