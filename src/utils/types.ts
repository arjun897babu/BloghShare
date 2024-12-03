import { Request } from "express";

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

