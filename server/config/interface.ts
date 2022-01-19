import { Document, ObjectId } from 'mongoose';
import { Request } from 'express';

export interface IUser extends Document {
    name: string
    story: string
    account: string
    my_tags: Array<IMytag>
    my_follow: Array<ObjectId>
    follower: Array<ObjectId>
    block_account: Array<ObjectId>
    post_saved: Array<ObjectId>
    password: string
    role: string
    avatar: string
    type: string
    is_destroy: boolean
    rf_token?: string
    _doc: object

}

export interface IMytag {
    _id: ObjectId
    idtag: ObjectId
    prioritize: number
}

export interface INewUser {
    name: string
    account: string
    password: string
}
export interface IDecodeToken{
    id?: string
    newUser?: INewUser
    iat: number
    exp: number
}

export interface IPayloadEmail{
    email: string
    email_verified: boolean
    name: string
    picture: string
}

export interface IUserRegister{
    name: string
    account: string
    password: string
    avatar?: string
    type: string
}

export interface IReqAuth extends Request {
    user?: IUser
}


export interface IComment extends Document {
    user: string
    id_blog: string
    id_user_blog: string
    content: string
    replyComment: string[]
    user_reply: string
    comment_root: string
    _doc: object
}