import type { NextFunction, Request, Response } from "express";
import type { AsyncController } from "../common/asyncControllerType.js";

const catchAsync = (fn: AsyncController) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
