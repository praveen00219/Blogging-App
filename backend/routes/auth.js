import express from "express";
import { verifyUser } from "../controller/auth.js";
import { verifyCookies } from "../middleware/protectedRoute.js";
const authRouter = express.Router();

authRouter.post("/verify-token", verifyUser);
authRouter.get("/check-auth", verifyCookies, (req,res)=>{
    const obj = {...req.user};
    delete obj._doc.password;
    delete obj._doc.token;
    const user = obj._doc
    res.status(200).json({message: "User is authenticated", user: user, isAuthenticated: true});
})
export default authRouter;