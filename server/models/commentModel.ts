import mongoose from "mongoose";
import { IComment } from "../config/interface";
const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    id_blog: { type: mongoose.Schema.Types.ObjectId, ref: 'blog' },
    id_user_blog: mongoose.Schema.Types.ObjectId,
    content: {type: String, required: true},
    replyComment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
    user_reply: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    comment_root: { type: mongoose.Types.ObjectId, ref: 'comment' }
},
    {
        timestamps: true
    })

export default mongoose.model<IComment>('comment', commentSchema)