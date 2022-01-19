import express from 'express'
import commentController from '../controller/commentControler';
import auth from '../middelware/auth';
const router = express.Router()

router.post('/create-comment',auth, commentController.createComment);

router.get('/get-comment/:id', commentController.getComments);

router.post('/reply_comment',auth, commentController.replyComment);

router.patch('/update-comment/:id', auth, commentController.updateComment)

router.delete('/delete_comment/:id', auth, commentController.deleteComment)

export default router;