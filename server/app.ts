/* import express cors */
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();
export const app = express();
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/userRoutes";

/* body parser */
app.use(express.json({ limit: "50mb" }));


/* cookie-parser */
app.use(cookieParser());


/* cors => cross origin resource sharing */
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

app.use("/api/v1", userRouter)

/* Testing api */
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

/* Unknown Root */
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Root ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);