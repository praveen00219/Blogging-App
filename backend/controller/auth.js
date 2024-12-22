import User from "../model/user.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { sendEmailForVerification } from "../middleware/nodemailer.js";
export const verifyUser = async (req, res) => {
  const { token } = req.body;
  try {
    console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const user = await User.findOneAndUpdate(
      { email: decoded.email },
      { isEmailVerified: true }
    );
    if (!user)
      return res
        .status(404)
        .json({ status: "failure", message: "User not found" });
    res.json({ status: "success", message: "Email verified successfully" });
  } catch (err) {
    if (err.name == "TokenExpiredError") {
      try {
        const user = await User.findOne({ token: token });
        if (!user)
          return res
            .status(404)
            .json({ status: "failure", message: "User not found" });
        const newToken = jwt.sign(
          { email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        user.token = newToken;
        await user.save();
        await sendEmailForVerification(user.email, newToken);
        res.json({
          status: "success",
          message: "Your token was expired. Email verification link sent again",
        });
      } catch (error) {
        res.status(500).json({ status: "failure", message: error.message });
      }
    } else {
      res.status(500).json({ status: "failure", message: err.message });
    }
  }
};
