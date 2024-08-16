import { Request, Response } from "express";
import { userService } from "../services/user.service";
import axios from "axios";
import { Positions } from "../types/Positions";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const count = req.query.count ? parseInt(req.query.count as string, 10) : 6;

  if (isNaN(page) || page < 1) {
    return res.status(400).send({
      success: false,
      message: "Invalid page parameter.",
    });
  }

  if (isNaN(count) || count < 1) {
    return res.status(400).send({
      success: false,
      message: "Invalid count parameter.",
    });
  }

  const startFrom = (page - 1) * count;
  const endTo = page * count;
  const paginatedUsers = users.slice(startFrom, endTo);

  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / count);

  const nextPage = page < totalPages ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${
    req.path
  }`;
  const next_url = nextPage
    ? `${baseUrl}?page=${nextPage}&count=${count}`
    : null;
  const prev_url = prevPage
    ? `${baseUrl}?page=${prevPage}&count=${count}`
    : null;

  return res.status(200).send({
    success: true,
    data: paginatedUsers,
    links: {
      next_url,
      prev_url,
    },
  });
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
  const { name, email, phone, positionName, photo } = req.body;
  const users = await userService.getAllUsers();

  let positionsValue: string[] = [];
  const apiPositionUrl =
    "https://frontend-test-assignment-api.abz.agency/api/v1/positions";
  const responsePositions = await axios.get(apiPositionUrl);
  const { positions } = responsePositions.data;
  positions.forEach((position: Positions) =>
    positionsValue.push(Object.values(position)[1])
  );

  const phoneRegex = /^[\+]{0,1}380([0-9]{9})$/;
  const emailRegex =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  const urlRegex =
    /^https:\/\/frontend-test-assignment-api\.abz\.agency\/images\/users\/[a-zA-Z0-9]+\.jpg$/;
  const existingUser = users.some((user) => user.email === email);

  if (name.length <= 2 || name.length > 60) {
    return res
      .status(400)
      .json({ message: `Name is wrong, need from 3 to 60 symbols` });
  }

  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: `Email is wrong, example - "name@some.com"` });
  }

  if (!phoneRegex.test(phone)) {
    return res
      .status(400)
      .json({ message: `Phone is wrong, example - "380123456789"` });
  }

  if (!positionsValue.includes(positionName)) {
    return res.status(400).json({
      message: `Position is wrong, example - 'Lawyer', 'Content manager', 'Security', 'Designer'`,
    });
  }

  if (!urlRegex.test(photo)) {
    return res.status(400).json({
      message:
        "Photo URL is wrong, example -\n https://frontend-test-assignment-api.abz.agency/images/users/66bf2b009b47722797.jpg",
    });
  }

  if (existingUser) {
    return res.status(400).json({ message: "Email is already used" });
  }

  const user = await userService.postUser({
    name,
    email,
    phone,
    positionName,
    photo,
  });

  return res.status(201).json(user);
};

export const userController = {
  getAllUsers,
  postUser,
  getUserById,
};
