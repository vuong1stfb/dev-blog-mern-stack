import express from 'express'
import freeController from '../controller/freeControllor';
import authhomepage from '../middelware/authhomepage';
const router = express.Router()

router.get('/list-home',authhomepage, freeController.getListHomePage);

router.get('/list-blogest-tag',authhomepage, freeController.getBlogTallestinTag);

router.get('/search', freeController.search);

export default router;