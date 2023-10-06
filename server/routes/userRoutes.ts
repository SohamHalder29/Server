import express  from "express";
import { RegistrationUser, activateUser, loginOut, loginUser } from "../controllers/userController";
import { isAutheticated } from "../middleware/auth";

/* Router create  */
const userRouter = express.Router();

userRouter.post('/register', RegistrationUser);
userRouter.post('/activation', activateUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout',isAutheticated, loginOut);
export default userRouter;