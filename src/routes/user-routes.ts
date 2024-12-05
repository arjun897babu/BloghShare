import { UserController } from "../controller/user-controller";
import { UserService } from "../services/user-service";
import { Bcrypt } from "../utils/bcrypt";
import expess from 'express'
import { JWT } from "../utils/jwt";
import { Auth } from "../middleware/auth-middleware";

const bcrypt = new Bcrypt()
const jwt = new JWT()
const auth = new Auth(jwt)
const userService = new UserService(bcrypt,jwt)
const userController = new UserController(userService);

const userRoutes = expess.Router();

userRoutes.post('/login',userController.login.bind(userController))
userRoutes.post('/signup',userController.signUp.bind(userController))
