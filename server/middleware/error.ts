import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  /* Wrong MongoDb ID */
  if (err.name === "CastError") {
    const message = `Resources not Found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  /* Duplicate Key Error */
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  /* Wrong JWT Error */
  if (err.name === "JsonWebTokenError") {
    const message = `JWT token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  /*  JWT Expire */
  if (err.name === "TokenExpiredError") {
    const message = `JWT token is expire, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
