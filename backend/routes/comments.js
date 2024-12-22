import express from 'express';
import { verifyCookies } from '../middleware/protectedRoute.js';
import { addComment, updateComment, deleteComment } from '../controller/comments.js';
const commentsRouter = express.Router();

commentsRouter.post('/add', verifyCookies, addComment);
commentsRouter.post('/update', verifyCookies, updateComment);
commentsRouter.delete('/delete', verifyCookies, deleteComment);

export default commentsRouter;