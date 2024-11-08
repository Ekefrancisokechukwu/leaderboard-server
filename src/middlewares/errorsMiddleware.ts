import { NextFunction, Request, Response } from "express";

interface ICustomError extends Error {
  statusCode?: number;
  errors?: { [key: string]: { message: string } };
  value?: string;
}

export default function errorsMiddleware(
  err: ICustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const customError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong!",
  };

  if (err.name === "ValidationError" && err.errors) {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  if (err.statusCode && err.statusCode === 11000) {
    customError.statusCode = 400;
    customError.message = `Duplicate value entered for ${err.errors} field`;
  }

  if (err.name === "CastError") {
    customError.message = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  res.status(customError.statusCode).json({ message: customError.message });
}
