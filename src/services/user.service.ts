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
    positionId,
    photo,
  }: {
    name: string;
    email: string;
    phone: string;
    positionId: number;
    photo: string;
  }): Promise<User> => {

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        positionId,
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
  }
};
