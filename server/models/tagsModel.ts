import mongoose from "mongoose";
const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Vui lòng nhập Tag name"],
        trim: true,
        maxlength: [20, "Tag name không vượt quá 20 ký tự"]
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, "Mô tả không vượt quá 1000 ký tự"],
        default: ""
    },
    abount: {
        type: String,
        trim: true,
        maxlength: [1000, "không vượt quá 300 ký tự"],
        default: ""
    },
    moderators: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    total_blog: {
        type: Number,
        default: 0
    },
    is_destroy: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    })

export default mongoose.model('tag', tagSchema)