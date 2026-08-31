import type { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchasync.js";
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";
import env from "../config/env.js";
import type { JwtPayload } from "../common/jwtPayload.js";
import { User, type UserDocument } from "../models/User.js";
export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;
    if (!authHeaders?.startsWith("Bearer"))
      throw new AppError("Unauthorized Access Please Login", 401);
    const token = authHeaders.split(" ")[1];
    if (!token) throw new AppError("Unauthorized", 401);
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    const user = await User.findById(payload.id);
    if (!user) throw new AppError("Unauthorized", 401);
    req.user = user;
    next();
  },
);
