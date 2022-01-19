import { Request, Response, NextFunction } from "express";
import Users from '../models/userModel';
import jwt from "jsonwebtoken";
import { IDecodeToken, IReqAuth } from "../config/interface";

const authhomepage = async (req: IReqAuth, res: Response, next: NextFunction) => {
    try {
        if(req.query.filter !== "follow") return next()
        // lấy token từ req header
        const token = req.header("Authorization");
        // console.log(token)
        // nếu k có trả về msg "Xác thực thất bại" 
        if (!token) return res.status(400).json({ msg: "Xác thực thất bại" })
        // decode token
        const decoded = <IDecodeToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
        // decode token không đúng báo lỗi "Xác thực thất bại" 
        if (!decoded) return res.status(400).json({ msg: "Xác thực thất bại" })

        // tìm kiếm người dùng theo id trong token đã decode được
        const user = await Users.findOne({ _id: decoded.id })
        // nếu không thấy trả về  "Người dùng không tồn tại" 
        if (!user) return res.status(400).json({ msg: "Người dùng không tồn tại" })
        // nếu thấy =>  gắn thông tin user vào req và chạy tiếp đến userControler
        req.user = user;

        next()
    } catch (error: any) {
        return res.status(500).json({ msg: error.message })
    }
}

export default authhomepage;