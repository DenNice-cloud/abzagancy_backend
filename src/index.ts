import express from "express";
import cors from "cors";

import { userRouter } from "./routes/user.route";
import { authRouter } from "./routes/auth.route";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("static"));

app.use("/", authRouter);
app.use("/users", userRouter);

