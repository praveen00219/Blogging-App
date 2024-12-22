import Blog from "../model/blogs.js";

export const createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const newBlog = await blog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", data: newBlog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllBlogs = async (req, res) => {
  let query = {};

  if (req.query.author)
    query.author = { $regex: new RegExp(req.query.author, "i") };
  if (req.query.title)
    query.title = { $regex: new RegExp(req.query.title, "i") };

  try {
    const blogs = await Blog.find(query);
    res.json({ message: "Blogs fetched successfully", data: blogs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog fetched successfully", data: blog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBlog)
      return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog updated successfully", data: updatedBlog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog)
      return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully", data: deletedBlog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
