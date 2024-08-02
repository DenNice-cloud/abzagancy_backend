import express from 'express';
import { userController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userController.postUser);
userRouter.get('/:id', userController.getUserById);

export { userRouter };