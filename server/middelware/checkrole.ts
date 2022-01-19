import { Request, Response, NextFunction } from "express";
import Users from '../models/userModel';
import jwt from "jsonwebtoken";
import { IDecodeToken, IReqAuth } from "../config/interface";

const checkrole = async (req: IReqAuth, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if(user?.role !== 'admin') return res.status(400).json({ msg: "Insufficient permission to access the link" })
        next()
    } catch (error: any) {
        return res.status(500).json({ msg: error.message })
    }
}

export default checkrole;