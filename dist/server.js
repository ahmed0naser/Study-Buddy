import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
// import mongoose from "mongoose";
// import userRouter from "./Routes/userRouter.js";
// import morgan from "morgan";
// import globalErrorHandler from "./middleWares/errorHandler.js";
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
// app.use("/api/v1/users", userRouter);
// if (process.env.MODE === "dev") {
//   app.use(morgan("dev"));
// }
// app.all("/{*any}", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });
// app.use(globalErrorHandler);
// app.listen(port, () => {
//   mongoose
//     .connect(process.env.DB_CONNECTION_STRING)
//     .then(() => {
//       console.log("DB Connected");
//       console.log("server started on port " + port);
//     })
//     .catch((err) => console.error("Connection error:", err));
// });
//# sourceMappingURL=server.js.map