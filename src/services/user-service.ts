import { HttpStatusCode } from "axios";
import { ICreateUser, IUser, IUserService, ILogin } from "../interface/user";
import { User } from "../model/user";
import { Bcrypt } from "../utils/bcrypt";
import { CustomError } from "../utils/custom-error";
import { ResponseStatus } from "../utils/enum";
import { JWT } from "../utils/jwt";
import { JwtPayload } from "../utils/types";

export class UserService implements IUserService {
  private bcrypt: Bcrypt;
  private jwt: JWT;
  constructor(bcrypt: Bcrypt, jwt: JWT) {
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }
  async create(userData: IUser): Promise<ICreateUser> {
    try {
      const existing = await User.exists({ email: userData.email });
      if (existing) {
        throw new CustomError(
          HttpStatusCode.Conflict,
          "email already exists",
          "email"
        );
      }
      const hashedPassword = await this.bcrypt.hash(userData.password);
      userData.password = hashedPassword;
      const newUser = await User.create(userData);

      return {
        status: ResponseStatus.SUCCESS,
        message: "user created successfully",
        data: {
          email: newUser.email,
          name: newUser.name,
          uId: newUser.uId,
        },
      };
    } catch (error) {
      throw error;
    }
  }
  async login(userData: Pick<IUser, "email" | "password">): Promise<ILogin> {
    try {
      const [user = null] = await User.aggregate<Pick<
        IUser,
        "email" | "password" | "name" | "uId"
      > | null>([
        {
          $match: {
            email: userData.email,
          },
        },
      ]);

      if (!user) {
        throw new CustomError(
          HttpStatusCode.NotFound,
          "user not found",
          "email"
        );
      }
      const comparePassword = this.bcrypt.compare(
        userData.password,
        user.password
      );

      if (!comparePassword) {
        throw new CustomError(
          HttpStatusCode.Unauthorized,
          "invalid password",
          "password"
        );
      }

      const payload = { _id: user.uId, role: "blogger" } as JwtPayload;
      const token = this.jwt.createAccessToken(payload, "15m");

      const refresh = this.jwt.createRefreshToken(payload, "7d");

      return {
        status: ResponseStatus.SUCCESS,
        message: "user logged successfully",
        token,
        refreshToken: refresh,
      };
    } catch (error) {
      throw error;
    }
  }
}
