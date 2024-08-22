"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_service_1 = require("../services/jwt.service");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const userData = jwt_service_1.jwtService.verify(token);
        if (userData) {
            next();
        }
        else {
            res.status(401).json({ message: "Invalid token" });
        }
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
