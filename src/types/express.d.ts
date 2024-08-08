import { Users } from "../types/Users";

declare global {
  namespace Express {
    interface Request {
      users?: Users; // создавался для вівода пользователя в authMiddleware.ts, зачем? я тоже не пойму..
    }
  }
}
