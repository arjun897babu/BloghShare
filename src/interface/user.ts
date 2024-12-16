import { Document } from "mongoose";
import { IResponse } from "../utils/types";

export interface IUser extends Document {
  uId: string;
  name: string;
  email: string;
  password: string;
}

export type IUserBase = Pick<IUser, "name" | "email" | "uId">;

export interface ICreateUser extends IResponse {
  data: IUserBase
}

export interface ILogin extends IResponse {
  data: {
    user: Pick<IUser, 'email' | 'name' | 'uId'>
    token: string;
    refreshToken: string;
  }
}

export interface IRefresh extends IResponse {
  data: {
    token: string;
    refreshToken: string;
  }
}

export interface IUserService {
  create: (userData: IUser) => Promise<ICreateUser>;
  login: (userData: Pick<IUser, "email" | "password">) => Promise<ILogin>;
  refresh: (userId: string) => Promise<IRefresh>
}
