import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "axios";
import { IUserService } from "../interface/user";
import {  successResponse } from "../utils/response";
import { Cookie, Node_ENV } from "../utils/enum";

class UserController {
  private userService;
  constructor(userService: IUserService) {
    this.userService = userService;
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const formData = req.body;
      const response = await this.userService.login(formData);

      if (response) {
        res.cookie(Cookie.refresh, response.data.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === Node_ENV.PROD,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return successResponse(
          res,
          HttpStatusCode.Ok,
          response.message,
          {token:response.data.token,user:response.data.user}
        );
      }
    } catch (error) {
      next(error);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const formData = req.body;
      const response = await this.userService.create(formData);
      if (response) {
        return successResponse(
          res,
          HttpStatusCode.Created,
          response.message,
          response.data
        );
      }
    } catch (error) { 
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie(Cookie.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
      });

      return successResponse(
        res,HttpStatusCode.Ok,'logged out successfully',
        undefined
      )
  
    } catch (error) {
      next(error)
    }
  }
}

export { UserController };
