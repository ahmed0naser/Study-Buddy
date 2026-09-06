import multer from "multer";
import path from "path";
import AppError from "../utils/appError.js";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      Math.round(Math.random() * 1e9) +
        "-" +
        Date.now() +
        "-" +
        file.originalname,
    );
  },
});
function checkFileType(
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) {
  console.log({
    originalName: file.originalname,
    mimetype: file.mimetype,
    extension: path.extname(file.originalname),
  });
  const filetypes = /\.(pdf|docx?)$/i;
  const extName = filetypes.test(path.extname(file.originalname));
  const allowedMimeTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/octet-stream",
  ];
  const mimeType = allowedMimeTypes.includes(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    return cb(new AppError("INVALID_FILE_TYPE", 400));
  }
}
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");
