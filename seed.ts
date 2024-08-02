import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.positions.createMany({
    data: [
      { id: 1, name: "Lawyer" },
      { id: 2, name: "Content manager" },
      { id: 3, name: "Security" },
      { id: 4, name: "Designer" }
    ],
  });

  await prisma.user.create({
    data: {
      id: 22635,
      name: "Annaa",
      email: "ana0@gmail.com",
      phone: "+380998887766",
      positionId: 1,
      photo: "https://frontend-test-assignment-api.abz.agency/images/users/66ab95e0e880822635.jpg",
    },
  });

  console.log('User and positions created!');
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
