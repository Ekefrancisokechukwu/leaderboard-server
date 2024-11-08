import { Response } from "express";
import jwt from "jsonwebtoken";

type PayLoad = {
  id: string;
  googleId: string;
};

export function generateToken({ googleId, id }: PayLoad) {
  const token = jwt.sign({ googleId, id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  return token;
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}

export const attachCookiesToResponse = (res: Response, user: PayLoad) => {
  const token = generateToken(user);

  const oneDay = 1000 * 60 * 60 * 25;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  return token;
};
