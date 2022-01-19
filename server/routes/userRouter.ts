import express from 'express';
import auth from '../middelware/auth';
import userController from '../controller/userController';
import { validUpdateProfile, validUpdateProfileImage, validUpdateProfileImageCover } from '../middelware/valid';

const router = express.Router()

router.patch('/updateprofile', auth, validUpdateProfile, userController.updateProfile)

router.patch('/updateprofileimage', auth, validUpdateProfileImage, userController.updateProfileImage)

router.patch('/updateprofileimage_cover', auth, validUpdateProfileImageCover, userController.updateProfileCover)

router.patch('/changepassword', auth, userController.changePassword)

router.patch('/reset_password', auth, userController.resetPassword)

router.patch('/follow-tag', auth, userController.followTag)

router.patch('/unfollow-tag', auth, userController.unfollowTag)

router.patch('/follow-user', auth, userController.followUser)

router.patch('/unfollow-user', auth, userController.unfollowUser)

router.patch('/block-user', auth, userController.blockUsers)

router.patch('/save-post', auth, userController.savePost)

router.patch('/unsave-post', auth, userController.unsavePost)

router.patch('/tag-priority', auth, userController.tagPriority)

router.patch('/pin-blog', auth, userController.pinBlog)

router.patch('/un-pin-blog', auth, userController.unpinBlog)

router.get('/profile/:id', userController.getProfile)

router.get('/blog-by-user/:id/:page', userController.getBlogByUser)

router.get('/getnotify',auth, userController.getnotification)

router.patch('/readingnoti',auth, userController.readingNoti)

router.get('/get-blog-saved/:page',auth, userController.getListBlogsaved)

router.get('/search-reading-list',auth, userController.searchBlogsaved)

router.get('/home-dashbroad/:page',auth, userController.getHomeDashbroad)

router.get('/get-follower',auth, userController.getListFollower)

router.get('/get-user-myfollow',auth, userController.getListUserMyFollow)

router.get('/get-tag-follow',auth, userController.getTagFollow)

router.get('/get-blog-pin',auth, userController.getListPinblog)

router.get('/get-blog-private',auth, userController.getListBlogPrivate)

router.post('/report-user',auth, userController.reportUser)

router.post('/report-blog',auth, userController.reportBlog)

router.get('/get-count-notifi',auth, userController.getCountNotifiUnRead)




export default router;