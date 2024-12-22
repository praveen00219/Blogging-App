import Blog from "../model/blogs.js";

export const addComment = async(req,res) => {
    try {
        const blogId = req.body.postId;
        const blog = await Blog.findById(blogId);
        const comments = blog.comments;
        comments.push(req.body.comment);
        const updatedBlog = await Blog.findByIdAndUpdate(blog._id, {comments}, {new: true});
        res.json({
            message: 'Comment added',
            data: updatedBlog,
            user: req.user
        });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({status: 'failure', message: err.message});
    }
}

export const updateComment = async(req, res) => {
    try {
        const blogId = req.body.postId;
        const blog = await Blog.findById(blogId);
        const comments = blog.comments;
        if(req.body.commentId >= comments.length) {
            return res.status(400).json({status: 'failure', message: 'Invalid commentId'});
        }
        comments.splice(parseInt(req.body.commentId), 1, req.body.comment);
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, {comments}, {new: true});
        return res.status(200).json({status: 'success', message: "Comment Updated.", data: updatedBlog, user: req.user});
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({status: 'failure', message: err.message});
    }
}

export const deleteComment = async(req, res) => {
    try {
        const blogId = req.body.postId;
        const blog = await Blog.findById(blogId);
        const comments = blog.comments;
        if(req.body.commentId >= comments.length) {
            return res.status(400).json({status: 'failure', message: 'Invalid commentId'});
        }
        comments.splice(parseInt(req.body.commentId), 1);
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, {comments}, {new: true});
        return res.status(200).json({status: 'success', message: "Comment Deleted.", data: updatedBlog, user: req.user});
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({status: 'failure', message: err.message});
    }
}