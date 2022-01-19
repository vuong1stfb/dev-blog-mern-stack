import { Request, Response, NextFunction } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";
import Blogs from "../models/blogModel";
import Tags from "../models/tagsModel";
import Notifications from "../models/notifyModel";
import Likes from "../models/likeModel";
import Comments from "../models/commentModel";
import moment from "moment";
import { io } from '../index'

const likeController = {
    
  // thích bài viết
  likeBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { idblog, id_user_blog } = req.body;
      const newNotifi = new Notifications({
        message: `thích bài viết của bạn`,
        idpost: idblog,
        to_user: id_user_blog,
        from_user: req.user._id,
        type: `like`,
    })
      // check xem người dùng đã like bài này chưa
      const checklike = await Likes.findOne({
        iduser: req.user?._id.toString(),
        idblog,
      });
      // nếu đã like thì return
      if (checklike) return res.status(400).json({ msg: "Truy vấn thất bại" });
      // nếu chưa lưu id user và id blog vào db Likes
      if(req.user._id.toString() !== id_user_blog) {
        // kiểm tra đã có thông báo bình luận bài viết này của người này chưa
        const checkNotilike = await Notifications.findOne({idpost: idblog,
            from_user: req.user._id,
            type: `like`})
            // nếu chưa
        if(!checkNotilike) {
            newNotifi.save()
            io.sockets.in(`${id_user_blog}`).emit('new_noti', {msg: "noti"});
        }
    }   


      const likeNew = new Likes({
        iduser: req.user?._id.toString(),
        idblog,
      });
      await likeNew.save();

      // cập nhật tổng like của blog
      await Blogs.findOneAndUpdate({ _id: idblog }, { $inc: { likecount: 1 } });
      return res.status(200).json({ msg: "ok" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // hủy thích bài viết
  unLikeBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { idblog } = req.body;
      console.log(idblog)
      // check user đã like chưa
      const checklike = await Likes.findOne({
        iduser: req.user?._id.toString(),
        idblog,
      });
      // nếu chưa thì return
      if (!checklike) return res.status(400).json({ msg: "Truy vấn thất bại" });
      // nếu đã like thì xóa document chưa id user và id blog tương ứng
      await Likes.findOneAndDelete({
        iduser: req.user?._id.toString(),
        idblog,
      });
      // cập nhật lại tổng số like của blog
      await Blogs.findOneAndUpdate(
        { _id: idblog },
        { $inc: { likecount: -1 } }
      );
      return res.status(200).json({ msg: "ok" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // like or unlike comment
  likeComment: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { idcomment } = req.body;

      const checklike = await Comments.findOne({
        _id: idcomment,
        user_like: req.user?._id.toString(),
      });

      if (checklike) {
        await Comments.findOneAndUpdate(
            { _id: idcomment },
            { $pull: { user_like: req.user?._id.toString() }, $inc: { likecount: -1 } }
          );
      }else{
        await Comments.findOneAndUpdate(
            { _id: idcomment },
            { $push: { user_like: req.user?._id.toString() }, $inc: { likecount: 1 } }
          );
      }

      return res.status(200).json({ msg: "ok" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default likeController;
