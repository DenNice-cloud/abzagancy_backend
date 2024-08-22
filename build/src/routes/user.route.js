"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.get("/", authMiddleware_1.authMiddleware, user_controller_1.userController.getAllUsers);
userRouter.post("/adduser", user_controller_1.userController.postUser);
userRouter.get("/:id", user_controller_1.userController.getUserById);
