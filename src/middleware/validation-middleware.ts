import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { ErrorObject } from "../utils/types";
import { HttpStatusCode } from "axios";
import { CustomError } from "../utils/custom-error";

export const validationMiddleWare = <T extends ZodSchema>(schema: T) => {
  return   (req: Request, res: Response, next: NextFunction) => {
    try { 
      schema.parse(req.body);
       return next();
    } catch (error) {
      if (error instanceof ZodError) {
        let err: ErrorObject = {};
        for (let eItem of error.errors) {
          if (!err[eItem.path[0]]) {
            err[eItem.path[0]] = eItem.message;
          }
        }
        console.table(err);
        throw new CustomError(
          HttpStatusCode.BadRequest,
          "bad request", 
          undefined,
          err
        );
      }
     return  next(error);
    }
  };
};
