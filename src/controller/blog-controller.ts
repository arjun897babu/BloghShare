import { NextFunction, Request, Response } from "express";
import { BlogService } from "../services/blog-service";

export class BlogController {
  private blogService: BlogService;
  constructor(blogService: BlogService) {
    this.blogService = blogService;
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const blogData = req.body;
      const response = this.blogService.create(userId, blogData);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, blogId } = req.params;
      const blogData = req.body;
      const response = this.blogService.update(blogId, blogData);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, blogId } = req.params;
      const response = this.blogService.delete(blogId);
    } catch (error) {
      next(error);
    }
  }
  async getSingle(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, blogId } = req.params;
      const response = this.blogService.getSingle(blogId);
    } catch (error) {
      next(error);
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = this.blogService.getAll();
    } catch (error) {
      next(error);
    }
  }
  async getUserBlogs(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId} = req.params;
      const response = this.blogService.getUserBlog(userId);
    } catch (error) {
      next(error);
    }
  }
}
