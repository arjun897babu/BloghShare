import {
  BlogResponse,
  IBlogBase,
  IBlogCU,
  IBlogService,
  IGetAllBlogs,
  SingleBlog,
} from "../interface/blog";
import { IFilter, IResponse } from "../utils/types";
import { ResponseStatus } from "../utils/enum";
import { Blog } from "../model/blog";
import { CustomError } from "../utils/custom-error";
import { HttpStatusCode } from "axios";
import { CloudinaryService } from "../utils/cloudinary";
import { removeFile } from "../utils/remove-file";
import { calculateSkip, calculateTotalPage } from "../utils/validator-helper";

export class BlogService implements IBlogService {
  private folder = process.env.app!;
  private pageLimit: number = 3;
  private cloudinary;
  constructor(cloudinary: CloudinaryService) {
    this.cloudinary = cloudinary;
  }
  async create(
    userId: string,
    blogData: SingleBlog,
    imagePath: string
  ): Promise<IBlogCU> {
    try {
      const { publicId, url } = await this.cloudinary.uploadImage(
        imagePath,
        this.folder
      );

      blogData.userId = userId;
      blogData.file = {
        publicId,
        url,
      } as SingleBlog["file"];

      const blog = await Blog.create(blogData);
      removeFile(imagePath);
      return this.generateResponseObject(
        blog,
        "blog created successfully"
      ) as IBlogCU;
    } catch (error) {
      throw error;
    }
  }
  async delete(blogId: string, imageId: string): Promise<IResponse> {
    const deleted = await Blog.findOneAndDelete({ uId: blogId }).lean();
    if (!deleted) {
      throw new CustomError(
        HttpStatusCode.NotFound,
        "blog not found",
        undefined,
        { common: "blog not found" }
      );
    }

    await this.cloudinary.deleteImage(imageId);

    return {
      status: ResponseStatus.SUCCESS,
      message: "blog deleted successfully",
    };
  }
  async getAll({ pageNumber, search }: IFilter): Promise<IGetAllBlogs> {
    const skip = calculateSkip(search === "" ? pageNumber : 1, this.pageLimit);
    const [allBlogs = []] = await Blog.aggregate([
      {
        $match: {
          title: { 
            $regex: search ? search : "", 
            $options: "i"         
          }
        },
      },
      {
        $lookup: {
          localField: "userId",
          foreignField: "uId",
          from: "users",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $facet: {
          totalDocument: [{ $count: "count" }],
          data: [
            { $skip: skip },
            { $limit: this.pageLimit },
            {
              $project: {
                _id: 0,
                __v: 0,
                updatedAt: 0,
                "user.password": 0,
                "user._id": 0,
                "user.__v": 0,
              },
            },
          ],
        },
      },
      {
        $unwind: "$totalDocument",
      },
      {
        $project: {
          totalCount: "$totalDocument.count",
          data: "$data",
        },
      },
    ]);

    return this.generateResponseObject(
      allBlogs.data,
      "all blogs fetched successfully",
      allBlogs.totalCount
    ) as IGetAllBlogs;
  }
  async getSingle(blogId: string): Promise<BlogResponse> {
    try {
      const [singleBlog = null] = await Blog.aggregate([
        { $match: { uId: blogId } },
        {
          $lookup: {
            localField: "userId",
            foreignField: "uId",
            from: "users",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            _id: 0,
            "user.password": 0,
            "user._id": 0,
          },
        },
      ]);
      if (!singleBlog) {
        throw new CustomError(
          HttpStatusCode.NotFound,
          "blog not found",
          undefined,
          { common: "blog not found" }
        );
      }
      return this.generateResponseObject(
        singleBlog,
        "single blog fetched successfully"
      ) as BlogResponse;
    } catch (error) {
      throw error;
    }
  }
  async getUserBlog(userId: string): Promise<IGetAllBlogs> {
    try {
      const userBlogs = await Blog.aggregate([
        { $match: {userId:userId} },
        {
          $lookup: {
            localField: "userId",
            foreignField: "uId",
            from: "users",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            _id: 0,
            "user.password": 0,
            "user._id": 0,
          },
        },
      ]);

      return this.generateResponseObject(
        userBlogs,
        "user blogs fetched successfully"
      ) as IGetAllBlogs;
    } catch (error) {
      throw error;
    }
  }
  async update(
    blogId: string,
    blogData: SingleBlog,
    imagePath?: string,
    imageId?: string
  ): Promise<IBlogCU> {
    try {
      if (imagePath && imageId) {
        const { publicId, url } = await this.cloudinary.uploadImage(
          imagePath,
          this.folder
        );
        await this.cloudinary.deleteImage(imageId);
        blogData.file = {
          publicId: publicId,
          url: url,
        };
      }

      const updated = await Blog.findOneAndUpdate(
        { uId: blogId },
        { $set: { ...blogData } },
        { new: true }
      ).lean();

      if (!updated) {
        throw new CustomError(
          HttpStatusCode.NotFound,
          "blog not found",
          undefined,
          { common: "blog not found" }
        );
      }
      return this.generateResponseObject(
        updated,
        "blog updated successfully"
      ) as IBlogCU;
    } catch (error) {
      throw error;
    }
  }

  private generateResponseObject(
    data: SingleBlog | SingleBlog[] | IBlogBase,
    message: string,
    totalPage?: number
  ): BlogResponse | IGetAllBlogs | IBlogCU {
    const arrayData = Array.isArray(data);
    const obj: any = {
      status: ResponseStatus.SUCCESS,
      message: message,
      data: {},
    };

    if (arrayData && totalPage) {
      obj.data.limit = this.pageLimit;
      obj.data.totalPage = calculateTotalPage(totalPage ?? 0, this.pageLimit);
      obj.data.blog = data as SingleBlog[];
    } else if (arrayData && !totalPage) {
      obj.data.blog = data as SingleBlog[];
    } else {
      obj.data.blog = data as IBlogBase;
    }

    return obj;
  }
}
