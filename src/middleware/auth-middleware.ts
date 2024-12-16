import { Request, Response, NextFunction } from "express";
import { JWT } from "../utils/jwt";
import { CustomError } from "../utils/custom-error";
import { HttpStatusCode } from "axios";
import { JwtPayload } from "../utils/types";
import { Cookie, Node_ENV } from "../utils/enum";
import { successResponse } from "../utils/response";

export class Auth {
  private jwt: JWT;

  constructor(jwtInstance: JWT) {
    this.jwt = jwtInstance;
  }

  isAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        throw new CustomError(
          HttpStatusCode.Unauthorized,
          "Unauthorized",
          "common"
        );
      }

      const decoded: JwtPayload = this.jwt.verifyAccessToken(token);
      if (decoded && decoded.role === "blogger") {
        req.params.userId = decoded._id;
         return next();
      }
    } catch (error) {
      next(error);
    }
  };
  isRefresh(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies[Cookie.refresh];
    try {
      if (!refreshToken) {
        throw new CustomError(
          HttpStatusCode.Unauthorized,
          "Unauthorized",
          "common"
        );
      }

      const decoded: JwtPayload = this.jwt.verifyRefreshToken(refreshToken);
      if (decoded && decoded.role === 'blogger') {
        req.params.userId = decoded._id
        return next()
      } else {
        throw new CustomError(
          HttpStatusCode.Unauthorized,
          "Unauthorized",
          "common"
        );
      }

    } catch (error) {
      next(error)
    }

  }
}
