import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import blogRouter from "./routes/blogs.js";
import cors from "cors";
import commentsRouter from "./routes/comments.js";
import cookieParser from "cookie-parser";

const app = express();

// MongoDB connection
mongoose
  .connect(process.env.MONGODBURL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  });

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/comments", commentsRouter);

app.use("*", (req, res) => {
  res.status(404).json({ message: "Invalid route" });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
