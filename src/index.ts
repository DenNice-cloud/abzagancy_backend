import express from "express";
import cors from "cors";

import { userRouter } from "./routes/user.route";
import { authRouter } from "./routes/auth.route";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(express.static("static"));
app.get("/", authRouter);

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
