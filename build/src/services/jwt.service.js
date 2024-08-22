"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_KEY = process.env.JWT_KEY || "hello";
function sign() {
    const token = jsonwebtoken_1.default.sign({ foo: "bar" }, JWT_KEY, { expiresIn: "40m" });
    return token;
}
function verify(token) {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_KEY);
    }
    catch (e) {
        return null;
    }
}
exports.jwtService = {
    sign,
    verify,
};
