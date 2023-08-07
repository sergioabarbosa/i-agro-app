import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'João Silva',
      username: 'joaosilva',
      email: 'joao@example.com',
      password: 'senha123',
      usertype: 'produtor',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Maria Silva',
      username: 'mariasilva',
      email: 'maria@example.com',
      password: 'senha123',
      usertype: 'consumidor',
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
