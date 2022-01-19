import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxLength: 20000,
    },
    title:{
        type: String,
        required: true,
        maxLength: 200,
    },
    imagepost: {
        type: String,
        required: true,
        default: ''
    },
    poster: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'tag'}],
    likecount: {
        type: Number,
        default: 0
    },
    commentcount: {
        type: Number,
        default: 0
    },
    saved: {
        type: Number,
        default: 0
    },
    viewer: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    pin: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['Public', 'Private'],
        default: 'Public'
    },
    is_detroy: {
        type: Boolean,
        default: false
    },
    removed: {
        idmod: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'user'
        },
        message: {
            type: String
        }
    }
},
    {
        timestamps: true
    })

    blogSchema.index({poster : 1})

export default mongoose.model('blog', blogSchema)