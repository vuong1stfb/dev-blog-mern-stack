import express from 'express'
import authController from '../controller/authController'
import { validRegister } from '../middelware/valid'
import auth from '../middelware/auth'
const router = express.Router()

router.post('/register',validRegister, authController.register)
router.post('/active', authController.acctiveAccount)
router.post('/login', authController.login)
router.get('/logout',auth, authController.logout)
router.get('/refresh_token', authController.refreshtoken)
router.post('/google_login', authController.googleLogin)
router.post('/facebook_login', authController.facebooklogin)
router.post('/forgot_password', authController.forgotPassword)


export default router;