import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export const validatinoMiddleWare = <T extends ZodSchema>(schema: T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
         console.log(error)
      }
      next(error);
    }
  };
};
