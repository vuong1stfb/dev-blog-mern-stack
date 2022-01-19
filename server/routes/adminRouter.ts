import express from 'express';
import adminController from '../controller/adminController';
import checkrole from '../middelware/checkrole';
import auth from '../middelware/auth';
import { validTag } from '../middelware/valid';


const router = express.Router()

router.post('/create-tags',auth,checkrole, validTag, adminController.createTags)

router.post('/addmoderators',auth,checkrole, adminController.addmoderators)

// router.post('/add-mod-for-tag',auth,checkrole, adminController.addModForTag)

router.post('/remove-mod-for-tag',auth,checkrole, adminController.removeModForTag)

router.get('/get-listtag',auth,checkrole, adminController.getListtagadmin)

router.patch('/update-tag',auth,checkrole, adminController.updateTags)

router.patch('/lockTag',auth,checkrole, adminController.lockTag)

router.patch('/unlockTag',auth,checkrole, adminController.unlockTag)

router.get('/homeadmin',auth,checkrole, adminController.getHomeDashbroadAdmin)

router.get('/getlistusermanager',auth,checkrole, adminController.getListUsermanager)

router.patch('/lockuser',auth,checkrole, adminController.lockUser)

router.patch('/unlockuser',auth,checkrole, adminController.unlockUser)

router.get('/get-report',auth,checkrole, adminController.getReport)

router.patch('/delete-report',auth,checkrole, adminController.readReport)

router.get('/get-list-mod',auth,checkrole, adminController.getListmod)

router.patch('/removed-mod',auth,checkrole, adminController.removedmod)

router.get('/getlist-blog-remove',auth,checkrole, adminController.getBlogremoved);



export default router;