// import type { NextFunction, Request, Response } from "express";
// import AppError from "../utils/appError.js";

// // DB Errors
// const handleCastErrorDB = (err) => {
//   return new AppError(`INVALID_${err.path.toUpperCase()}`, 400);
// };

// const handleDuplicateFieldsDB = (err) => {
//   const field = Object.keys(err.keyValue)[0];

//   const fieldUpper = field.toUpperCase();
//   return new AppError(`${fieldUpper}_ALREADY_EXISTS`, 409);
// };

// const handleValidationErrorDB = (err) => {
//   const fields = Object.keys(err.errors).join(", ");
//   return new AppError(`VALIDATION_ERROR: ${fields}`, 400);
// };

// // JWT Errors
// const handleJWTError = () => new AppError("INVALID_TOKEN", 401);
// const handleJWTExpiredError = () => new AppError("TOKEN_EXPIRED", 401);

// // Send Error
// const sendErrorDev = (err, res) => {
//   res.status(err.statusCode).json({
//     success: false,
//     message: err.message,
//     error: {
//       code: err.message,
//       stack: err.stack,
//       details: err,
//     },
//   });
// };

// const sendErrorProd = (err, res) => {
//   if (err.isOperational) {
//     res.status(err.statusCode).json({
//       success: false,
//       message: err.message,
//       // error: {
//       //   code: err.message,
//       // },
//     });
//   } else {
//     console.error("UNEXPECTED ERROR:", err);
//     res.status(500).json({
//       success: false,
//       message: "INTERNAL_SERVER_ERROR",
//     });
//   }
// };

// // Global Error Handler
// const errorHandler = (
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   if (err instanceof AppError) {
//     err.statusCode = err.statusCode || 500;
//     err.status = err.status || "error";
//     let error = { ...err };
//     error.message = err.message;
//     error.name = err.name;
//     // error.stack = err.stack;

//     if (error.name === "CastError") error = handleCastErrorDB(error);
//     if (error.code === 11000) error = handleDuplicateFieldsDB(error);
//     if (error.name === "ValidationError")
//       error = handleValidationErrorDB(error);
//     if (error.name === "JsonWebTokenError") error = handleJWTError();
//     if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

//     if (process.env.NODE_ENV === "dev") {
//       sendErrorDev(error, res);
//     } else if (process.env.NODE_ENV === "prod") {
//       sendErrorProd(error, res);
//     }
//   }
// };
import type { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError.js";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

export default errorHandler;
