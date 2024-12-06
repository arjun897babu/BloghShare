import { model, Schema } from "mongoose";
import { IUser } from "../interface/user";
import { generateRandomUUID } from "../utils/validator-helper";

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  uId: {
    type: String,
   },
});

userSchema.pre<IUser>("save", function (next) {
  if (!this.uId) {
    this.uId = generateRandomUUID();
  }
  next();
});

export const User = model("User", userSchema);
