import { Router } from "express";
import { Login, Register, protectedRoute, verifyEmail } from "../controllers/userController.ts";
import { requireSignIn } from "../middlewares/auth.ts";

const userRouter = Router();

userRouter.post('/login', Login);
userRouter.post('/register',Register);
userRouter.post('/protected',requireSignIn,protectedRoute)
userRouter.get('/verify/:id/:slug', verifyEmail)


export default userRouter;