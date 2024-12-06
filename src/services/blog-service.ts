import {
  BlogResponse,
  IBlogService,
  IGetAllBlogs,
  SingleBlog,
} from "../interface/blog";
import { IResponse } from "../utils/types";
import { ResponseStatus } from "../utils/enum";

export class BlogService implements IBlogService {
  async create(
    userId: string,
    blogData: Omit<SingleBlog, "uid" | "userId">
  ): Promise<BlogResponse> {
    return {
      status: ResponseStatus.SUCCESS,
      message: "",
      data: {
        blog: {
          content: "",
          file: { url: "", publicId: "" },
          title: "",
          uId: "",
          userId: "",
        },
      },
    };
  }
  async delete(blogId: string): Promise<IResponse> {
    return {
      status: ResponseStatus.SUCCESS,
      message: "",
    };
  }
  async getAll(): Promise<IGetAllBlogs> {
    return {
      status: ResponseStatus.SUCCESS,
      message: "",
      data: {
        blog: [
          {
            content: "",
            file: { url: "", publicId: "" },
            title: "",
            uId: "",
            userId: "",
          },
        ],
      },
    };
  }
  async getSingle(blogId: string): Promise<BlogResponse> {
    return {
      status: ResponseStatus.SUCCESS,
      message: "",
      data: {
        blog: {
          content: "",
          file: { url: "", publicId: "" },
          title: "",
          uId: "",
          userId: "",
        },
      },
    };
  }
  async getUserBlog(userId: string): Promise<IGetAllBlogs> {
    return {
      status: ResponseStatus.SUCCESS,
      message: "",
      data: {
        blog: [
          {
            content: "",
            file: { url: "", publicId: "" },
            title: "",
            uId: "",
            userId: "",
          },
        ],
      },
    };
  }
  async update(blogId: string, blogData: SingleBlog): Promise<BlogResponse> {
    return {
      status: ResponseStatus.SUCCESS,
      message: "",
      data: {
        blog: {
          content: "",
          file: { url: "", publicId: "" },
          title: "",
          uId: "",
          userId: "",
        },
      },
    };
  }
}
