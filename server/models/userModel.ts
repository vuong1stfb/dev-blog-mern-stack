import mongoose from "mongoose";
import { IUser } from "../config/interface";
const useSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Vui lòng nhập Username của bạn"],
        trim: true,
        maxlength: [30, "Username không vượt quá 30 ký tự"]
    },
    story: {
        type: String,
        trim: true,
        maxlength: [200, "Không nhập quá 200 ký tự"],
        default: ""
    },
    location: {
        type: String,
        trim: true,
        maxlength: [50, "Không nhập quá 50 ký tự"],
        default: ""
    },
    web_url: {
        type: String,
        trim: true,
        maxlength: [50, "Không nhập quá 50 ký tự"],
        default: ""
    },
    learning:{
        type: String,
        trim: true,
        maxlength: [100, "Không nhập quá 100 ký tự"],
        default: ""
    },
    work: {
        type: String,
        trim: true,
        maxlength: [100, "Không nhập quá 100 ký tự"],
        default: ""
    },
    education: {
        type: String,
        trim: true,
        maxlength: [100, "Không nhập quá 100 ký tự"],
        default: ""
    },
    account: {
        type: String,
        required: [true, "Vui lòng nhập email hoặc số điện thoại"],
        trim: true,
        unique: true,
        index: true
    },
    my_tags: [
        {
            idtag: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'tag'
            },
        }
    ],
    my_follow: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', }],
    follower: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', }],
    block_account: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user',}],
    post_saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'blog' }],
    password: {
        type: String,
        required: [true, "Vui lòng nhập Password"],
        trim: true,
    },
    role: {
        type: String,
        default: 'user'
    },
    avatar: {
        type: String,
        default: 'https://www.iass-potsdam.de/sites/default/files/styles/square_round_2_up/public/default_images/default_avatar_0.png?itok=ytiGDvoH'
    },
    coverimage: {
        type: String,
        default: 'https://img2.thuthuatphanmem.vn/uploads/2019/01/19/hinh-anh-mau-den-4k-3840x2160_030503266.jpg'
    },
    type: {
        type: String,
        default: 'register'
    },
    is_destroy: {
        type: Boolean,
        default: false
    },
    rf_token: { type: String,  select: false }
},
    {
        timestamps: true
    })

export default mongoose.model<IUser>('user', useSchema)