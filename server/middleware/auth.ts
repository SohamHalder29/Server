import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";


/* Autheticated user */
const isAutheticated =CatchAsyncError(async (req:Request, res:Response, next:NextFunction)=>{
    const access_token = req.cookies.access_token;

    if(!access_token){
        return next(new ErrorHandler("Please LogIn to access", 400));
    }

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;

    if(!decoded){
        return next(new ErrorHandler("access token is not valid", 400));
    }

    const user = await redis.get(decoded._id)

    if(!user){
        return next(new ErrorHandler("user not found", 400));
    }
    
    req.user = JSON.parse(user);

    next();
})

export {isAutheticated}