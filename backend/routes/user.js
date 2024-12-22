import express from 'express';
import { loginUser, registerUser, logOut } from '../controller/user.js';
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logOut);
export default userRouter;