import type { NextFunction, Request, Response } from "express";
import { User } from "../models/User.js";
import jwt, { type SignOptions } from "jsonwebtoken";
import type SignupBody from "../common/signupBody.js";
import env from "../config/env.js";
import catchAsync from "../utils/catchasync.js";
import AppError from "../utils/appError.js";
import type LoginBody from "../common/loginBody.js";
import type { JwtPayload } from "../common/jwtPayload.js";
// const signToken = ({ id, name }) => {
//   return jwt.sign({ id, name }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRATION,
//   });
// };
// const createSendToken = (user, status, res) => {
//   const token = jwt.sign(
//     { id: user._id, name: user.name },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: process.env.JWT_EXPIRATION,
//     },
//   );
//   //remove password if returned
//   //user.password=undefined
//   return res.status(status).json({
//     status: "success",
//     token,
//     data: {
//       user,
//     },
//   });
// };
export const signup = catchAsync(
  async (
    req: Request<{}, {}, SignupBody>,
    res: Response,
    next: NextFunction,
  ) => {
    const {
      userName,
      email,
      confirmPassword,
      password: bodyPassword,
    } = req.body;
    if (bodyPassword !== confirmPassword) {
      return next(new AppError("Password must match", 400));
    }
    const newUser = await User.create({
      userName,
      email,
      password: bodyPassword,
    });

    const token = jwt.sign({ id: newUser.id, userName }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRATION as NonNullable<SignOptions["expiresIn"]>,
    });
    const { password, ...user } = newUser.toObject();

    return res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  },
);
export const login = catchAsync(
  async (
    req: Request<{}, {}, LoginBody>,
    res: Response,
    next: NextFunction,
  ) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password)))
      return next(new AppError("Incorrect email or password", 401));
    const token = jwt.sign(
      { id: user.id, userName: user.userName },
      env.JWT_SECRET,
      {
        expiresIn: env.JWT_EXPIRATION as NonNullable<SignOptions["expiresIn"]>,
      },
    );
    const { password: _, ...returnedUser } = user.toObject();

    return res.status(200).json({
      status: "success",
      token,
      data: {
        returnedUser,
      },
    });
  },
);

export const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // if (res.cookies?.token) {
    //   token = res.cookies.token;
    // }

    return res.status(200).json({
      success: true,
      message: "Done successfully",
      data: {
        user: req.user,
      },
    });
  },
);
