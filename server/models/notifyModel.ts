import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
  {
    message: String,
    idpost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog",
      },
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    from_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    type: {
        type: String,
        enum: ['comment', 'like', "different", 'follow', "blog"],
        default: 'different'
    },
    is_reading: {
        type: Boolean,
        default: false
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("notification", notificationSchema);
