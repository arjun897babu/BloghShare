import { Router } from "express";
import { BlogController } from "../controller/blog-controller";
import { BlogService } from "../services/blog-service";
import { validationMiddleWare } from "../middleware/validation-middleware";
import { blogSchema } from "../utils/zod-schema";
import { Auth } from "../middleware/auth-middleware";
import { jwt } from "./user-routes";

const authMiddleWare = new Auth(jwt)
const blogService = new BlogService();
const blogController = new BlogController(blogService);

const blogRoutes = Router();

blogRoutes.use(authMiddleWare.isAuth.bind(authMiddleWare))

blogRoutes
  .route("/")
  .get(blogController.getAll.bind(blogController))
  .post(validationMiddleWare(blogSchema),blogController.create.bind(blogController));
blogRoutes
  .route("/:userId")
  .get(blogController.getUserBlogs.bind(blogController));
blogRoutes
  .route("/:blogId")
  .get(blogController.getSingle.bind(blogController))
  .delete(blogController.delete.bind(blogController))
  .put(validationMiddleWare(blogSchema),blogController.update.bind(blogController));
export default blogRoutes