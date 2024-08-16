import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

async function main() {
  const apiUserUrl =
    "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=100";

  const apiPositionUrl =
    "https://frontend-test-assignment-api.abz.agency/api/v1/positions";

  try {
    const responseUsers = await axios.get(apiUserUrl);
    const { success: successUsers, users } = responseUsers.data;

    const responsePositions = await axios.get(apiPositionUrl);
    const { success: successPositions, positions } = responsePositions.data;

    if (
      successUsers &&
      Array.isArray(users) &&
      successPositions &&
      Array.isArray(positions)
    ) {
      await prisma.user.deleteMany({});
      await prisma.positions.deleteMany({});

      await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1;`;
      await prisma.$executeRaw`ALTER SEQUENCE "Positions_id_seq" RESTART WITH 1;`;

      const positionMap: Record<number, number> = {};

      for (const position of positions) {
        const createdPosition = await prisma.positions.create({
          data: {
            name: position.name,
          },
        });
        positionMap[position.id] = createdPosition.id;
      }

      for (const user of users) {
        const positionId = positionMap[user.position_id];

        if (!positionId) {
          console.warn(
            `Position with id ${user.position_id} not found for user ${user.name}. Skipping user.`
          );
          continue;
        }

        await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            positionId,
            registrationTimestamp: user.registration_timestamp,
            photo: user.photo,
          },
        });
      }
    }
  } catch (error) {
    console.error("Error fetching or inserting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch(async (e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
