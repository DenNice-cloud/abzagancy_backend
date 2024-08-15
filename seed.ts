import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

async function main() {
  const apiUserUrl =
    "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=50";

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

      for (const position of positions) {
        await prisma.positions.create({
          data: {
            name: position.name,
          },
        });
      }

      for (const user of users) {
        await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            positionId: user.position_id,
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
