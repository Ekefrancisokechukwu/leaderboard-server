import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import jwt from "jsonwebtoken";

// export const ensureAuthenticated = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }

//   res
//     .status(401)
//     .json({ message: "Unauthorized. Please log in to access this resource." });
// };

interface AuthenticatedRequest extends Request {
  user?: any; // Customize with your user type if needed
}

export const ensureAuthenticated = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized. Token missing." });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
    req.user = decoded;
    next();
  });
};

// export function ensureAuthenticated(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const token = req.signedCookies.token;

//   console.log("token authmidd", token);

//   if (!token) {
//     res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     verifyToken(token);
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// }
