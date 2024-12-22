import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getSingleBlog, updateBlog } from '../controller/blogs.js';
const blogRouter = express.Router();

blogRouter.post('/create', createBlog);
blogRouter.get('/getall', getAllBlogs);
blogRouter.get('/get/:id', getSingleBlog);
blogRouter.put('/update/:id', updateBlog);
blogRouter.delete('/delete/:id', deleteBlog);

export default blogRouter;