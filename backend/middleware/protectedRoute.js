import User from "../model/user.js";
import jwt from "jsonwebtoken";
export const verifyCookies = async (req, res, next) => {
  if (req.cookies.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      const user = await User.findOne({ email: decoded.email })
        .select("-password")
        .select("-isEmailVerified");
      console.log(user);
      if (!user) {
        return res.status(404).json({
          status: "failure",
          message: "User not found",
          isAuthenticated: false,
        });
      }
      req.user = user;
    } catch (error) {
      if (error.name == "TokenExpiredError") {
        return res.status(440).json({
          status: "failure",
          message: "Your session is over. Login again.",
          isAuthenticated: false,
        });
      } else {
        return res.status(401).json({
          status: "failure",
          message: "Invalid token",
          isAuthenticated: false,
        });
      }
    }
  } else {
    return res.status(400).json({
      status: "failure",
      message: "log in to access",
      isAuthenticated: false,
    });
  }
  next();
};
