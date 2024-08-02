import express, { Request, Response } from 'express';
// import { authRouter } from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.get('/', (req: Request, res: Response) => {
  res.send("Auth route");
});

export { authRouter };
