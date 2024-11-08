import { Request, Response } from "express";

export default function notFoundMiddleware(req: Request, res: Response) {
  res.status(404).json({ message: "Route does not exists!" });
}
