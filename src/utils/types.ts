import { Request } from "express";
import { ResponseStatus } from "./enum";

export type ErrorObject = { [field: string]: string };

export interface MulterRequest extends Request {
  files?: {
    [filedName: string]: Express.Multer.File[];
  };
  imagePath?: string;
}
export type JwtPayload = {
  _id: string;
  role: "blogger";
};

export interface IResponse {
  status: ResponseStatus;
  message: string;
}
