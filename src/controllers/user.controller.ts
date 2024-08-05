import { Request, Response } from "express";
import { userService } from "../services/user.service";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  // const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  // const count = req.query.count ? parseInt(req.query.count as string, 10) : 6;

  // if (isNaN(page) || page < 1) {
  //   return res.status(400).send({
  //     success: false,
  //     message: "Invalid page parameter.",
  //   });
  // }

  // if (isNaN(count) || count < 1) {
  //   return res.status(400).send({
  //     success: false,
  //     message: "Invalid count parameter.",
  //   });
  // }

  // const startFrom = (page - 1) * count;
  // const endTo = page * count;
  // const paramsUser = users.slice(startFrom, endTo);

  return res.status(200).send(users);
};

const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const user = await userService.getUserById(userId);

  if (isNaN(userId)) {
    return res.status(400).send({
      success: false,
      message: "Invalid ID format",
    });
  }

  if (!user) {
    return res.status(400).send({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).send(user);
};

const postUser = async (req: Request, res: Response) => {
  const { name, email, phone, positionId, photo } = req.body;

  const phoneRegex = /^[\+]{0,1}380([0-9]{9})$/;
  const emailRegex =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

  // const errors = {
  //   email: validateEmail(email),
  //   password: validatePassword(password),
  // };
  if (name.length < 2 || name.length > 60) {
    console.log("Bad request, name is wrong");
  }

  if (!phoneRegex.test(phone)) {
    console.log("Bad request, phone is wrong");
  }

  if (!emailRegex.test(email)) {
    console.log("Bad request, email is wrong");
  }

  // User`s position id. You can get list of all positions with their IDs using the API method GET api/v1/positions.
  // Minimum size of photo 70x70px. The photo format must be jpeg/jpg type. The photo size must not be greater than 5 Mb.

  // if (errors.email || errors.password) {
  //   throw ApiError.BadRequest('Bad request', errors);
  // }

  // await authService.register({ email, password, firstName, lastName });
  const user = await userService.postUser({
    name,
    email,
    phone,
    positionId,
    photo,
  });

  return res.status(200).send(user);
};

export const userController = {
  getAllUsers,
  postUser,
  getUserById,
};
