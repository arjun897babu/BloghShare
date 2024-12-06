import { Document, ObjectId } from "mongoose";
import { IResponse } from "../utils/types";

export interface IBlog extends Document {
  uId: string;
  userId: string;
  title: string;
  content: string;
  file: { publicId: string; url: string } | File; // either a string URL or a image File
}

export type SingleBlog = Pick<
  IBlog,
  "uId" | "userId" | "title" | "content" | "file"
>;
export interface BlogResponse extends IResponse {
  data: {
    blog: SingleBlog;
  };
}

export interface IGetAllBlogs extends IResponse {
  data: {
    blog: SingleBlog[];
  };
}

export interface IBlogService {
  create: (
    userId: string,
    blogData: Omit<SingleBlog, "uid" | "userId">
  ) => Promise<BlogResponse>;
  update: (blogId: string, blogData: SingleBlog) => Promise<BlogResponse>;
  getSingle: (blogId: string) => Promise<BlogResponse>;
  getAll: () => Promise<IGetAllBlogs>;
  delete: (blogId: string) => Promise<IResponse>;
  getUserBlog: (userId: string) => Promise<IGetAllBlogs>;
}
