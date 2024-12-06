import { model, Schema } from "mongoose";
import { IBlog } from "../interface/blog";
import { generateRandomUUID } from "../utils/validator-helper";
import { string } from "zod";

const blogSchema = new Schema<IBlog>({
  userId: {
    type: String,
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
    publicId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  uId: {
    type: String,
  },
});

blogSchema.pre("save", function (next) {
  if (!this.uId) {
    this.uId = generateRandomUUID();
  }
  next();
});

export const Blog = model("Blog", blogSchema);
