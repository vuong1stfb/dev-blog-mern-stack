import { Request, Response } from "express";
import Comments from "../models/commentModel";
import Notifications from "../models/notifyModel";
import Users from "../models/userModel";
import { IReqAuth } from "../config/interface";
import Blogs from "../models/blogModel";
import mongoose from 'mongoose'
import { io } from "../index";

const commentController = {
    createComment: async ( req: IReqAuth, res: Response ) => {
        if(!req.user) return res.status(400).json({ msg: "invalid Authentication" })
        try {
            const { content, id_blog, id_user_blog  } = req.body

            const newComment = new Comments({
                user: req.user._id, // id user bình luận
                content, // nội dung
                id_blog, // id blog
                id_user_blog // id chủ blog
            })

            const newNotifi = new Notifications({
                message: `đã bình luận về bài viết`,
                idpost: id_blog,
                to_user: id_user_blog,
                from_user: req.user._id,
                type: `comment`,
            })
            // nếu không phải chủ blog bình luận
            if(req.user._id.toString() !== id_user_blog) {
                // kiểm tra đã có thông báo bình luận bài viết này của người này chưa
                const checkNoticomment = await Notifications.findOne({idpost: id_blog,
                    from_user: req.user._id,
                    type: `comment`})
                    // nếu chưa
                if(!checkNoticomment) {
                    await newNotifi.save(),
                    io.sockets.in(`${id_user_blog}`).emit('new_noti', {msg: "noti"});
                }
            }      
            // const abc = userBlog.follower.map((idfolower: any) => (
            //     {
            //         message : `đã bình luận về bài viết của bạn `,
            //         idpost: id_blog,

            //     }
            // ))
            
            await newComment.save()

            await Blogs.findOneAndUpdate({ _id: id_blog }, { $inc: { commentcount: 1 } });

            return res.json(newComment)

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },

    getComments: async (req: Request, res: Response) => {
        // const { limit, skip } = Pagination(req)
    
        try {
          const data = await Comments.aggregate([
            {
              $facet: {
                totalData:[
                  { $match: {
                    id_blog: new mongoose.Types.ObjectId(req.params.id),
                    comment_root: { $exists: false },
                    user_reply: { $exists: false }
                  }},
                  {
                    $lookup: {
                      "from": "users",
                      "localField": "user",
                      "foreignField": "_id",
                      "as": "user"
                    }
                  },
                  { $unwind: "$user" },
                  {
                    $lookup: {
                      "from": "comments",
                      "let": { comment_id: "$replyComment" },
                      "pipeline": [
                        { $match: { $expr: { $in: ["$_id", "$$comment_id"] } } },
                        {
                          $lookup: {
                            "from": "users",
                            "localField": "user",
                            "foreignField": "_id",
                            "as": "user"
                          }
                        },
                        { $unwind: "$user" },
                        {
                          $lookup: {
                            "from": "users",
                            "localField": "user_reply",
                            "foreignField": "_id",
                            "as": "user_reply"
                          }
                        },
                        { $unwind: "$user_reply" },
                      ],
                      "as": "replyComment"
                    }
                  },
                  { $sort: { createdAt: -1 } },
                //   { $skip: skip },
                //   { $limit: limit }
                ],
                totalCount: [
                  { $match: {
                    id_blog: new mongoose.Types.ObjectId(req.params.id),
                    comment_root: { $exists: false },
                    user_reply: { $exists: false }
                  }},
                  { $count: 'count' }
                ]
              }
            },
            {
              $project: {
                count: { $arrayElemAt: ["$totalCount.count", 0] },
                totalData: 1
              }
            }
          ])
    
          const comments = data[0].totalData;
          const count = data[0].count;
    
          return res.json({ comments, count })
          
        } catch (err: any) {
          return res.status(500).json({msg: err.message})
        }
      },

    replyComment: async ( req: IReqAuth, res: Response ) => {
        if(!req.user) return res.status(400).json({ msg: "invalid Authentication" })
        try {
            const { content, id_blog, id_user_blog, comment_root, user_reply  } = req.body

            const newComment = new Comments({
                user: req.user._id,
                content, 
                id_blog, 
                id_user_blog,
                comment_root,
                user_reply: user_reply._id
            })
            console.log({newComment})
            await Comments.findOneAndUpdate({_id: comment_root}, {
                $push: { replyComment: newComment._id}
            })

            await newComment.save()

            return res.json(newComment)

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },


    updateComment: async (req: IReqAuth, res: Response) => {
      if(!req.user)
        return res.status(400).json({msg: "invalid Authentication."})
  
      try {
        const { content } = req.body;

        console.log(req.body)
  
        const comment = await Comments.findOneAndUpdate({
          _id: req.params.id, user: req.user.id
        }, { content })
  
        if(!comment)
          return res.status(400).json({msg: "Bình luận không tồn tại hoặc đã bị xóa"})
  
        return res.json({msg: "Update Success!"})
        
      } catch (err: any) {
        return res.status(500).json({msg: err.message})
      }
    },

    deleteComment: async (req: IReqAuth, res: Response) => {
      if(!req.user)
        return res.status(400).json({msg: "invalid Authentication."})
  
      try {
  
        const comment = await Comments.findOneAndDelete({
          _id: req.params.id, 
          $or: [
            { user: req.user._id },
            { blog_user_id: req.user._id}
          ]
        })
  
        if(!comment)
          return res.status(400).json({msg: "Bình luận không tồn tại hoặc đã bị xóa"})
        
          // check xem comment muốn xóa có phải là comment trả lời không
        if(comment.comment_root){
          // nếu là comment trả lời của comment khác thì xóa cmt đó
          await Comments.findOneAndUpdate({_id: comment.comment_root}, {
            $pull: { replyCM: comment._id }
          })
        }else{

          // nếu là comment không phải trả lời thì xóa tất cả các comment trả lời của cmt đó
          await Comments.deleteMany({_id: {$in: comment.replyComment}})
          await Blogs.findOneAndUpdate({ _id: comment.id_blog }, { $inc: { commentcount: -1 } });
        }
  
        return res.json({msg: "Delete Success!"})
        
      } catch (err: any) {
        return res.status(500).json({msg: err.message})
      }
    }
}

export default commentController;