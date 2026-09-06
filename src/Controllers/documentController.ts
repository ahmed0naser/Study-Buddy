import type { Request } from "express";
import catchAsync from "../utils/catchasync.js";
import { Document } from "../models/Document.js";
import AppError from "../utils/appError.js";

export const createDocument = catchAsync(async (req: Request, res, next) => {
  if (!req.file) return next(new AppError("No file uploaded", 400));
  const title = req.body.title || req.file.originalname.split(".")[0];
  const document = await Document.create({
    user: req.user!._id,
    title,
    extractedText: "",
    status: "Processing",
    originalName: req.file.originalname,
    path: req.file.path,
  });
  res.json({
    status: "success",
    data: {
      document,
    },
  });
});
