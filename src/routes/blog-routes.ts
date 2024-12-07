import { Router } from "express";
import { BlogController } from "../controller/blog-controller";
import { BlogService } from "../services/blog-service";
import { validationMiddleWare } from "../middleware/validation-middleware";
import { blogSchema } from "../utils/zod-schema";
import { Auth } from "../middleware/auth-middleware";
import { authMiddleWare, jwt } from "./user-routes";
import { CloudinaryService } from "../utils/cloudinary";
import { upload } from "../middleware/multer";

const cloudinary = new CloudinaryService();

const blogService = new BlogService(cloudinary);
const blogController = new BlogController(blogService);

const blogRoutes = Router();

blogRoutes
  .route("/")
  .get(
    authMiddleWare.isAuth.bind(authMiddleWare),
    blogController.getAll.bind(blogController)
  )
  
blogRoutes
  .route("/blog/:blogId")
  .get(
    authMiddleWare.isAuth.bind(authMiddleWare),
    blogController.getSingle.bind(blogController)
  )
  

blogRoutes
  .route("/user/blog")
  .get(
    authMiddleWare.isAuth.bind(authMiddleWare),
    blogController.getUserBlogs.bind(blogController)
  )
  .post(
    authMiddleWare.isAuth.bind(authMiddleWare),
    upload.single("file"),
    validationMiddleWare(blogSchema),
    blogController.create.bind(blogController)
  )


blogRoutes
  .route("/user/:blogId")
  .put(
    authMiddleWare.isAuth.bind(authMiddleWare),
    upload.single("file"),
    validationMiddleWare(blogSchema),
    blogController.update.bind(blogController)
  )
  .delete(
    authMiddleWare.isAuth.bind(authMiddleWare),
    blogController.delete.bind(blogController)
  );

export default blogRoutes;
