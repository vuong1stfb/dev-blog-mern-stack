import express from 'express'
import likeController from '../controller/likeControllor';
import auth from '../middelware/auth';
const router = express.Router()

// like bài viết
router.patch('/like-blog',auth, likeController.likeBlog);

// un like bài viết
router.patch('/unlike-blog',auth, likeController.unLikeBlog);

// like bình luận
router.patch('/like-comment',auth, likeController.likeComment);



export default router;