// backend/prisma/seed.js

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      text: 'Tarea de ejemplo para pruebas',
      done: false,
    },
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });

   await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"Task"', 'id'), COALESCE((SELECT MAX(id) FROM "Task"), 1))`
  );