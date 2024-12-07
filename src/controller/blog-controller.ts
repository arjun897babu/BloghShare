import { NextFunction, Request, Response } from "express";
import { successResponse } from "../utils/response";
import { HttpStatusCode } from "axios";
import { IBlogService } from "../interface/blog";
import { MulterRequest } from "../utils/types";
import { CustomError } from "../utils/custom-error";

export class BlogController {
  private blogService: IBlogService;
  constructor(blogService: IBlogService) {
    this.blogService = blogService;
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const imagePath = req.file;
      (req as MulterRequest).imagePath = imagePath?.path;
      const { userId } = req.params;
      if (!userId) {
        throw new CustomError(401, "unauthorized", "userId");
      }

      const blogData = req.body;
      const response = await this.blogService.create(
        userId,
        blogData,
        imagePath?.path!
      );
      return successResponse(
        res,
        HttpStatusCode.Created,
        response.message,
        response.data
      );
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, blogId } = req.params;
      const imageId = req.query.imageId 
      if(typeof imageId!=='string'||imageId==='undefined'){
        throw new CustomError(HttpStatusCode.BadRequest,'bad request','common')
      }
      const imagePath = req.file;
      (req as MulterRequest).imagePath = imagePath?.path;

      const blogData = req.body;
      const response = await this.blogService.update(blogId, blogData,imagePath?.path,imageId);
      return successResponse(
        res,
        HttpStatusCode.Created,
        response.message,
        response.data
      );
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, blogId } = req.params;
      const imageId = req.query.imageId 
      if(typeof imageId!=='string'||imageId==='undefined'){
        throw new CustomError(HttpStatusCode.BadRequest,'bad request','common')
      }
      const isDeleted = await this.blogService.delete(blogId,imageId);
      return successResponse(
        res,
        HttpStatusCode.Ok,
        isDeleted.message,
        undefined
      );
    } catch (error) {
      next(error);
    }
  }
  async getSingle(req: Request, res: Response, next: NextFunction) {
    console.log('calling get single cont');
    try {
      const { userId, blogId } = req.params;
      const response = await this.blogService.getSingle(blogId);
      console.log(response);
      
      return successResponse(
        res,
        HttpStatusCode.Ok,
        response.message,
        response.data
      );
    } catch (error) {
      next(error);
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.blogService.getAll();
      return successResponse(
        res,
        HttpStatusCode.Ok,
        response.message,
        response.data
      );
    } catch (error) {
      next(error);
    }
  }
  async getUserBlogs(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const response = await this.blogService.getUserBlog(userId);
      return successResponse(
        res,
        HttpStatusCode.Ok,
        response.message,
        response.data
      );
    } catch (error) {
      next(error);
    }
  }
}
