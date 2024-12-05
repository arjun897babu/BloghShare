import { model, Schema } from "mongoose";
import { IBlog } from "../interface/blog";
import { generateRandomUUID } from "../utils/validator-helper";

const blogSchema = new Schema<IBlog>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  file: {
    type: String,
    required: true,
  },
});

blogSchema.pre("save", function (next) {
  if (!this.uId) {
    this.uId = generateRandomUUID();
  }
  next();
});

export const Blog = model("Blog", blogSchema);
