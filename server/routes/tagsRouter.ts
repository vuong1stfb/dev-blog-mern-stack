import express from 'express'
import tagsController from '../controller/tagsControllor';
const router = express.Router()

router.get('/get-blog-by-tag/:id/:page', tagsController.getBlogbytag);

router.get('/get-infor-tag/:id', tagsController.getInforTags);

router.get('/get-list-tag', tagsController.getListtag);

router.get('/get-list-tag-top', tagsController.getListtagtop);

export default router;