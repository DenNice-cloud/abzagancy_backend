import express from "express";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRouter = express.Router();

userRouter.get("/", authMiddleware, userController.getAllUsers);
userRouter.post("/addUser", userController.postUser);
userRouter.get("/:id", userController.getUserById);

export { userRouter };
