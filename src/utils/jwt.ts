import { verify, sign, TokenExpiredError } from "jsonwebtoken";
import { JwtPayload } from "./types";
import { CustomError } from "./custom-error";
import { HttpStatusCode } from "axios";

class JWT {
 private accessSecret: string = process.env.JWT_ACCESS_SECRET!;
 private refreshSecret: string = process.env.JWT_REFRESH_SECRET!;

  createAccessToken(payload: JwtPayload, expires: string) {
    return sign(payload, this.accessSecret, { expiresIn: expires });
  }
  createRefreshToken(payload: JwtPayload, expires: string) {
    return sign(payload, this.refreshSecret, { expiresIn: expires });
  }

  verifyAccessToken(token: string): JwtPayload {
    try {
      return verify(token, this.accessSecret) as JwtPayload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new CustomError(
          HttpStatusCode.Unauthorized,
          "Access token expired",
          "token"
        );
      } else {
        throw new CustomError(
          HttpStatusCode.Forbidden,
          "Invalid token",
          "token"
        );
      }
    }
  }

  verifyRefreshToken(token: string): JwtPayload | string {
    try {
      return verify(token, this.refreshSecret) as JwtPayload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new CustomError(
          HttpStatusCode.Unauthorized,
          "Access token expired",
          "common"
        );
      } else {
        throw new CustomError(
          HttpStatusCode.Forbidden,
          "Invalid token",
          "common"
        );
      }
    }
  }
}

export { JWT };

const token = new JWT()
