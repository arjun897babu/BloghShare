import { Document } from "mongoose";
import { IFilter, IResponse } from "../utils/types";
import { IUserBase } from "./user";

export interface IBlog extends Document {
  uId: string;
  userId: string;
  title: string;
  content: string;
  file: { publicId: string; url: string }; // either a string URL or a image File
}

export interface IBlogBase
  extends Pick<IBlog, "uId" | "userId" | "title" | "content" | "file"> {}

export interface SingleBlog extends IBlogBase {
  user: IUserBase;
  createdAt: string;
}

export interface BlogResponse extends IResponse {
  data: {
    blog: SingleBlog;
  };
}

export interface IBlogCU extends IResponse{
  data:{
    blog:IBlogBase
  }
}

export interface IGetAllBlogs extends IResponse {
  data: {
    blog: SingleBlog[];
    limit?:number,
    totalPage?:number
  };
}

export interface IBlogService {
  create: (
    userId: string,
    blogData: SingleBlog,
    imagePath: string
  ) => Promise<IBlogCU>;
  update: (
    blogId: string,
    blogData: SingleBlog,
    imagePath?: string,
    imageId?:string
  ) => Promise<IBlogCU>;
  getSingle: (blogId: string) => Promise<BlogResponse>;
  getAll: (filter:IFilter) => Promise<IGetAllBlogs>;
  delete: (blogId: string,imageId:string) => Promise<IResponse>;
  getUserBlog: (userId: string) => Promise<IGetAllBlogs>;
}
