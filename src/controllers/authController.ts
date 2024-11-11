import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import User, { IUser } from "../models/User";
import BadRequestError from "../errors/badRequest";

export function googleCallback(req: Request, res: Response) {
  const user = req.user as IUser;

  const token = generateToken({
    googleId: user.googleId,
    id: JSON.stringify(user._id),
  });

  // Send a message to the opener window with the token
  res.send(`
      <script>
        window.opener.postMessage({ type: "AUTH_SUCCESS", token: "${token}" }, "http://localhost:3002");
        window.close();
      </script>

    `);
}

export async function getLoggedInUser(req: Request, res: Response) {
  const tokenUser = req.user as IUser;

  const user = await User.findOne({ googleId: tokenUser.googleId });

  if (!user) {
    throw new BadRequestError("User not found");
  }
  console.log(user);

  res.status(200).json({
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture,
  });
}

export function logout(req: Request, res: Response) {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.redirect("/");
  });
}
