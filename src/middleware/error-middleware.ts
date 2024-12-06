import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { CustomError } from "../utils/custom-error";
import { MulterError } from "multer";
import { ErrorObject, MulterRequest } from "../utils/types";
import { removeFile } from "../utils/remove-file";
import { errorResponse } from "../utils/response";
import { HttpStatusCode } from "axios";

export const ErrorMiddleware = (err: Error, req: Request, res: Response,next:NextFunction) => {
  console.log('reaching in eror handler')
  const filePath = (req as MulterRequest).imagePath;
  if (filePath) {
    removeFile(filePath);
  }

  if (err instanceof MulterError) {
    
  } else if (err instanceof CustomError) {
    const error = err.field ? { [err.field]: err.message } : err.err;
    return errorResponse(
      res,
      err.statusCode,
      err.message,
      error as ErrorObject
    );
  } else {
    return errorResponse(res, HttpStatusCode.InternalServerError, err.message, {
      common: err.message,
    });
  }
};
