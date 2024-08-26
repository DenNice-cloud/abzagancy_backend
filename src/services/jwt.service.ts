import jwt from "jsonwebtoken";

const JWT_KEY = process.env.JWT_KEY || "NEW_JWT_KEY";

function sign() {
  const token = jwt.sign({ foo: "bar" }, JWT_KEY, { expiresIn: "40m" });

  return token;
}

function verify(token: string) {
  try {
    return jwt.verify(token, JWT_KEY);
  } catch (e) {
    return null;
  }
}

export const jwtService = {
  sign,
  verify,
};
