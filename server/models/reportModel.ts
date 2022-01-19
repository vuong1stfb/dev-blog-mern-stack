import mongoose from "mongoose";
const reportSchema = new mongoose.Schema(
  {
    message: String,
    blog_report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog",
    },
    user_report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    from_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    report_process: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: ['blog', 'user'],
        default: 'user',
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("report", reportSchema);
