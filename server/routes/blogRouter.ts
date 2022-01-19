import express from 'express'
import blogController from '../controller/blogController';
import auth from '../middelware/auth';
import { validBlog } from '../middelware/valid';
const router = express.Router()

router.post('/create-blog',auth, validBlog, blogController.createBlog);

router.patch('/update-blog',auth, validBlog, blogController.updateBlog);

router.patch('/delete-blog',auth, blogController.deleteBlog);

router.get('/blog/:idblog', blogController.getBlogById);

router.patch('/private-blog',auth, blogController.privateBlog);

router.patch('/public-blog',auth, blogController.publicBlog);

router.patch('/view-blog',auth, blogController.viewBlog);

router.patch('/mod-remove-blog',auth, blogController.modRemoveBlog);


export default router;