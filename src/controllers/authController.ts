import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import { IUser } from "../models/User";

export function googleCallback(req: Request, res: Response) {
  const user = req.user as IUser;

  const token = generateToken({
    googleId: user.googleId,
    id: JSON.stringify(user._id),
  });

  console.log(token);

  res.redirect("/"); // Redirect to your dashboard or homepage
}

export function logout(req: Request, res: Response) {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.redirect("/"); // Redirect to your dashboard or homepage
  });
}
