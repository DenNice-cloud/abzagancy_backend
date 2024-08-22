"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const db_1 = __importDefault(require("../utils/db"));
exports.userService = {
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.default.user.findMany();
    }),
    postUser: (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, email, phone, positionName, photo, }) {
        const position = yield db_1.default.positions.findFirst({
            where: {
                name: positionName,
            },
        });
        if (!position) {
            throw new Error(`Position "${positionName}" not found.`);
        }
        const user = yield db_1.default.user.create({
            data: {
                name,
                email,
                phone,
                positionId: position.id,
                photo,
            },
        });
        return user;
    }),
    getUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield db_1.default.user.findUnique({
            where: {
                id,
            },
        });
        return product;
    }),
};
