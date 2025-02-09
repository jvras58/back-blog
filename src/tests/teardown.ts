import { prisma } from '../lib/db';

export default async function globalTeardown() {
  await prisma.$disconnect();
}
