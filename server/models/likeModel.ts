import mongoose from "mongoose";
const likeSchema = new mongoose.Schema({
    iduser: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    idblog: { type: mongoose.Schema.Types.ObjectId, ref: 'ulog' },
},
    {
        timestamps: true
    })

export default mongoose.model('like', likeSchema)