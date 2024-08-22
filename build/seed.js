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
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUserUrl = "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=100";
        const apiPositionUrl = "https://frontend-test-assignment-api.abz.agency/api/v1/positions";
        try {
            const responseUsers = yield axios_1.default.get(apiUserUrl);
            const { success: successUsers, users } = responseUsers.data;
            const responsePositions = yield axios_1.default.get(apiPositionUrl);
            const { success: successPositions, positions } = responsePositions.data;
            if (successUsers &&
                Array.isArray(users) &&
                successPositions &&
                Array.isArray(positions)) {
                yield prisma.user.deleteMany({});
                yield prisma.positions.deleteMany({});
                yield prisma.$executeRaw `ALTER SEQUENCE "User_id_seq" RESTART WITH 1;`;
                yield prisma.$executeRaw `ALTER SEQUENCE "Positions_id_seq" RESTART WITH 1;`;
                const positionMap = {};
                for (const position of positions) {
                    const createdPosition = yield prisma.positions.create({
                        data: {
                            name: position.name,
                        },
                    });
                    positionMap[position.id] = createdPosition.id;
                }
                for (const user of users) {
                    const positionId = positionMap[user.position_id];
                    if (!positionId) {
                        console.warn(`Position with id ${user.position_id} not found for user ${user.name}. Skipping user.`);
                        continue;
                    }
                    yield prisma.user.create({
                        data: {
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            positionId,
                            registrationTimestamp: user.registration_timestamp,
                            photo: user.photo,
                        },
                    });
                }
            }
        }
        catch (error) {
            console.error("Error fetching or inserting data:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
main()
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    throw e;
}))
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
