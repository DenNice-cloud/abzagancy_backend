import { User } from "@prisma/client";
import prisma from "../utils/db";

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    return prisma.user.findMany();
  },
  postUser: async ({
    name,
    email,
    phone,
    positionName,
    photo,
  }: {
    name: string;
    email: string;
    phone: string;
    positionName: string;
    photo: string;
  }): Promise<User> => {
    const position = await prisma.positions.findFirst({
      where: {
        name: positionName,
      },
    });

    if (!position) {
      throw new Error(`Position "${positionName}" not found.`);
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        positionId: position.id,
        photo,
      },
    });

    return user;
  },

  getUserById: async (id: number) => {
    const product = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return product;
  },
};
