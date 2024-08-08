import { Request, Response, NextFunction } from "express";
import { jwtService } from "../services/jwt.service";
import { JwtPayload } from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    console.log('error is here1', token);
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const userData = jwtService.verify(token) as JwtPayload;
    console.log(userData);

    if (userData) {
      // req.users = userData;
      next();
    } else {
      console.log('error is here2');
      res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.log('error is here3');
    res.status(401).json({ message: 'Invalid token' });
  }
};
