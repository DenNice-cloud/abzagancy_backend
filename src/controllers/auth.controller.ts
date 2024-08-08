import { Request, Response } from "express";
import { jwtService } from "../services/jwt.service";

const getToken = async (req: Request, res: Response) => {
  const accessToken = jwtService.sign();

  res.json({
    accessToken,
  });
};

export const authController = {
  getToken,
};
