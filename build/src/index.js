"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./routes/user.route");
const auth_route_1 = require("./routes/auth.route");
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("static"));
app.use("/", auth_route_1.authRouter);
app.use("/users", user_route_1.userRouter);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
