import { Document } from "mongoose";
import { IResponse } from "../utils/types";

export interface IUser extends Document {
  uId: string;
  name: string;
  email: string;
  password: string;
}

export interface ICreateUser extends IResponse {
  data: Pick<IUser, "name" | "email" | "uId">;
}

export interface ILogin extends IResponse {
  data: {
    user:Pick<IUser,'email'|'name'|'uId'>
    token: string;
    refreshToken: string;
  }
}

export interface IUserService {
  create: (userData: IUser) => Promise<ICreateUser>;
  login: (userData: Pick<IUser, "email" | "password">) => Promise<ILogin>;
}
