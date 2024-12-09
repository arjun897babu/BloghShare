import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + path.extname(file.originalname));
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
   const supportedImages = [ ".jpg", ".png", ".gif", ".webp",".jpeg"];
  const isAllowed = supportedImages.includes(
    path.extname(file.originalname).toLowerCase()
  );

  if (isAllowed) {
    cb(null, true);
  } else {
    cb(new Error("unsupported image"));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});
