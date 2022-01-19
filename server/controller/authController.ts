import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateActiveToken, generateAccessToken, generateRefreshToken } from '../config/generatetoken'
import sendEmail from "../config/sendEmail";
import Tags from "../models/tagsModel";
import { validateEmail } from "../middelware/valid";
import { IDecodeToken, IUser, IPayloadEmail, IUserRegister, IReqAuth } from "../config/interface";
import { OAuth2Client } from "google-auth-library";
import fetch from "node-fetch";

const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`)
const CLIENT_URL = `${process.env.BASE_URL}`

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const { name, account, password } = req.body;
            console.log(req.body)
            //tìm kiếm trong db
            const user = await Users.findOne({ account });

            if (user) return res.status(400).json({ msg: 'Tài khoản đã tồn tại' })
            // mã hóa mật khẩu
            const hasspassword = await bcrypt.hash(password, 12)
            const newUser = { name, account, password: hasspassword }

            // tạo active token bằng tất cả thông tin người dùng nhập name, account, password 
            const active_token = generateActiveToken({ newUser })

            // tạo url xác thực tài khoản
            const url = `${CLIENT_URL}/active/${active_token}`

            // send email
            if (validateEmail(account)) {
                sendEmail(account, url, 'Xác thực tài khoản')
                return res.json({ msg: `Đăng ký thành công. Vui lòng kiểm tra hộp thư được gửi đến địa chỉ Email: ${account}`, url })
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },

    acctiveAccount: async (req: Request, res: Response) => {
        try {
            const { active_token } = req.body;
            // decode active token
            const decodetoken = <IDecodeToken>jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
            // lấy thông tin user từ activetoken đã decode
            const { newUser } = decodetoken;
            // nếu k có thông tin hoặc token hết hạn thì thông báo cho user
            if (!newUser) return res.status(400).json({ msg: "Xác thực không thành công, vui lòng thử lại" });

            // kiểm tra user trong database 
            const user = await Users.findOne({ account: newUser.account })
            // nếu đã tồn tại thì return && thông báo
            if (user) return res.status(400).json({ msg: "Tài khoản đã tồn tại" })

            // nếu chưa thì thêm user vào db bằng thông tin user có trong active token
            const new_user = new Users(newUser)
            await new_user.save();
            res.json({ msg: "Xác thực tài khoản thành công !" })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { account, password } = req.body;
            // kiểm tra trong db
            const user = await Users.findOne({ account });
            if (!user) return res.status(400).json({ msg: 'Tài khoản không tồn tại' })
            // nếu tìm thấy tài khoản khớp với tài khoản người dùng nhập
            loginUser(user, password, res)
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },

    refreshtoken: async (req: Request, res: Response) => {
        try {
            // lấy rf token trong cookie
            const rf_token = req.cookies.refreshtoken;
            // nếu k có thông báo cho người dùng
            if (!rf_token) return res.status(400).json({ msg: 'Phiên đăng nhập hết hạn, Vui lòng đăng nhập lại' })
            // nếu có thì decode token ra
            const decode_rftoken = <IDecodeToken>jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
            // nếu k có id thì thông báo hết hạn đăng nhâoj 
            if (!decode_rftoken.id) return res.status(400).json({ msg: 'Phiên đăng nhập hết hạn, Vui lòng đăng nhập lại' })
            // nếu có thì tiến hành tìm kiếm trong db
            const user = await Users.findById(decode_rftoken.id).select('-password +rf_token')

            // console.log(user)
            // nếu tìm không thấy thì thông báo tài khoản k tồn tại
            if (!user) return res.status(400).json({ msg: 'Tài khoản không tồn tại' })

            if(rf_token !== user.rf_token)
                return res.status(400).json({msg: "Phiên đăng nhập hết hạn, Vui lòng đăng nhập lại"})

            // nếu vượt qua tất cả các bước trên thì dùng id user encode 1 mã token mới gửi về cho người dùng
            const access_token = generateAccessToken({ id: user._id })
            const refresh_token = generateRefreshToken({ id: user._id }, res);
    
            await Users.findOneAndUpdate({_id: user._id}, {
                rf_token: refresh_token
            })
            return res.json({ access_token, user })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },

    logout: async (req: IReqAuth, res: Response) => {
        if(!req.user)
        return res.status(400).json({msg: "Xác thực thất bại"})
        try {
            // xóa rftoken trong cookie
            res.clearCookie('refreshtoken', { path: '/api/refresh_token' })
            await Users.findOneAndUpdate({_id: req.user._id}, {
                rf_token: ''
            })
            return res.json({ msg: "Đăng xuất" })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    
    googleLogin: async (req: Request, res: Response) => {
        try {
            const { id_token } = req.body;
            const veryfi = await client.verifyIdToken({
                idToken: id_token,
                audience: `${process.env.MAIL_CLIENT_ID}`
            })
            const { email, email_verified, name, picture } = <IPayloadEmail>veryfi.getPayload()

            if (!email_verified) return res.status(500).json({ msg: 'Xác thực email không thành công, Vui lòng thử lại' })
            const password = email + 'YmxvZ2NoaWFzZWtpZW50aHVj'
            const hasspass = await bcrypt.hash(password, 12)

            const user = await Users.findOne({ account: email })
            if (user) {
                loginUser(user, password, res);
            } else {
                const infouser = {
                    name,
                    account: email,
                    password: hasspass,
                    avatar: picture,
                    type: 'google'
                }
                registerUser(infouser, res)
            }
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },

    facebooklogin: async (req: Request, res: Response) => {
        try {
            const { accessToken, userID } = req.body

            const URL = `
              https://graph.facebook.com/v3.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}
            `
            const data = await fetch(URL)
            .then(res => res.json())
            .then(res => { return res })
            
            const { email, name, picture } = data

            const password = email + 'GukjbGIuigUggYUYGhhGgGGHhggI'
            const passwordHash = await bcrypt.hash(password, 12)
            
            const user = await Users.findOne({account: email})

            if(user){
              loginUser(user, password, res)
            }else{
              const user = {
                name, 
                account: email, 
                password: passwordHash, 
                avatar: picture.data.url,
                type: 'facebook'
              }
              registerUser(user, res)
            } 
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },

    forgotPassword: async(req: Request, res: Response) => {
        try {
          const { account } = req.body
    
          const user = await Users.findOne({account})
          if(!user)
            return res.status(400).json({msg: 'Tài khoản không tồn tại'})

    
          const access_token = generateAccessToken({id: user._id})
    
          const url = `${CLIENT_URL}/resert_password/${access_token}`

          if(validateEmail(account)){
            sendEmail(account, url, "Forgot password?")
            return res.json({msg: "Chúng tôi đã gửi thư tới email của bạn, vui lòng check email"})
          }
    
        } catch (err: any) {
          return res.status(500).json({msg: err.message})
        }
    },
}

const loginUser = async (user: IUser, password: string, res: Response) => {
    // decode mật khẩu trong tài khoản tìm thấy trong db và so sánh với mật khẩu ng dùng nhập
    const checkpass = await bcrypt.compare(password, user.password);
    console.log(user)
    if (!checkpass) return res.status(400).json({ msg: 'Tài khoản hoặc mật khẩu không chính xác' })
    if(user.is_destroy === true) return res.status(400).json({ msg: 'Tài khoản của bạn đang tạm khóa' })
    // encode accesstoken và refreshtoken 
    const access_token = generateAccessToken({ id: user._id });
    const refresh_token = generateRefreshToken({ id: user._id }, res);
    
    await Users.findOneAndUpdate({_id: user._id}, {
        rf_token: refresh_token
    })


    res.json({
        msg: 'Đăng nhập thành công',
        access_token,
        user: { ...user._doc, password: '' }
    })

}

const registerUser = async (user: IUserRegister,  res: Response) => {

    const newUser = new Users(user)
    
      // encode accesstoken và refreshtoken 
      const access_token = generateAccessToken({ id: newUser._id });
      const refresh_token = generateRefreshToken({ id: newUser._id }, res);
    // lưu token vào cookie 
    // res.cookie('refreshtoken', refresh_token, {
    //     httpOnly: true,
    //     path: '/api/refresh_token',
    //     maxAge: 30 * 24 * 60 * 60 * 1000 // 30 ngày
    // })

    newUser.rf_token = refresh_token
    await newUser.save()

    res.json({
        msg: 'Đăng nhập thành công',
        access_token,
        user: { ...newUser._doc, password: '' }
    })

}

export default authController;