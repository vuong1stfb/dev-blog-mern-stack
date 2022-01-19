import { Request, Response, NextFunction } from "express";
import { IReqAuth } from "../config/interface";
import Users from '../models/userModel';
import Blogs from "../models/blogModel";
import Tags from "../models/tagsModel";
import Notifications from "../models/notifyModel";
import Likes from "../models/likeModel";
import moment from "moment";

const blogController = {
    // tạo bài đăng
    createBlog: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" })
        try {
            const { title, content, desc, img, tag } = req.body;
            const user = req.user;

            const newBlog = new Blogs({
                title,
                content,
                // description: desc,
                imagepost: img,
                tags: tag,
                poster: user?._id.toString()
            })
            // tìm bài viết mới nhất của user
            const checkblog = await Blogs.findOne({ poster: user?._id.toString() }).limit(1).sort({ createdAt: -1 });
            // lấy khoảng thời gian user từ bài viết mới nhất của user đến khoảng thời gian hiện tại
            if (checkblog) {
                const checktime = moment().diff(checkblog.createdAt, 'minutes')
                // kiểm tra thời gian đăng của bài mới nhất đã quá 30p chưa
                if (checktime < 1) {
                    return res.status(400).json(
                        { msg: `Để tránh tình trạng spam bài đăng trên trang vui lòng đăng bài viết sau ${30 - checktime} phút nữa` }
                    )
                }
            }
            const listnoti = user.follower.map((iduser: any) => {
                return {
                    message: `vừa đăng một bài viết mới`,
                    idpost: newBlog._id,
                    to_user: iduser,
                    from_user: user._id,
                    type: `blog`}
            })
            // console.log(listnoti)
            
            await newBlog.save();
            await Notifications.insertMany(listnoti)

            // tăng tổng số bài đăng thuộc các thẻ tag
            await Tags.updateMany({ _id: { $in: tag } }, { $inc: { total_blog: 1 } });
            return res.status(200).json({ msg: "Đã tạo bài đăng" })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })

        }
    },
    // sửa bài đăng
    updateBlog: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" })
        try {
            const { title, content, desc, img, tag, idblog } = req.body;
            const user = req.user;
            // kiểm tra bài đăng có tồn tại không, đồng thời lấy ra danh sách tag của bài đăng
            const checkblog = await Blogs.findOne({ _id: idblog, poster: user?._id.toString() }, {
                _id: 0,
                content: 0,
                title: 0,
                description: 0,
                imagepost: 0,
                poster: 0,
                views: 0,
                type: 0,
                is_detroy: 0,
                createdAt: 0,
                updatedAt: 0,
                __v: 0
            });
            // kiểm tra tag khi update và tag trong db có sự thay đổi không
            const checktag = JSON.stringify(checkblog.tags) === JSON.stringify(tag);
            // nếu không => update user như bình thường
            if (checktag) {
                const updateblog = await Blogs.findOneAndUpdate({ _id: idblog, poster: user?._id.toString() }, {
                    title,
                    content,
                    // description: desc,
                    imagepost: img,
                    tags: tag,
                })
                if (!updateblog) return res.status(400).json({ msg: "Xác thực không hợp lệ" })
            } else {
                // nếu có sự thay đổi thì update bài đăng đồng thời giảm tổng số bài đăng của các thẻ tag bị loại bỏ
                // và thêm lại tăng tổng số bài đăng của tag mới thêm lên
                const updateblog = await Blogs.findOneAndUpdate({ _id: idblog, poster: user?._id.toString() }, {
                    title,
                    content,
                    // description: desc,
                    imagepost: img,
                    tags: tag,
                })
                if (!updateblog) return res.status(400).json({ msg: "Xác thực không hợp lệ" })
                await Tags.updateMany({ _id: { $in: checkblog.tags } }, { $inc: { total_blog: Number(-1) } });
                await Tags.updateMany({ _id: { $in: tag } }, { $inc: { total_blog: 1 } });
            }
            return res.status(200).json({ msg: "Cập nhật bài viết thành công" })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },

    deleteBlog: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" })
        try {
            const { idblog } = req.body;
            const user = req.user;
            const delBlog = await Blogs.findOneAndUpdate({ _id: idblog }, {
                is_detroy: true
            })
            if (!delBlog) return res.status(400).json({ msg: "Xác thực không hợp lệ" })
            res.status(200).json({ msg: "Xóa bài viết thành công" })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },

    privateBlog: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" })
        try {
            const idblog = req.body.idblog

            await Blogs.findOneAndUpdate({ _id: idblog}, {
                status: "Private", pin: false
            })

            res.status(200).json({msg: "Đã thêm blog vào blog riêng tư"})

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
      },

      publicBlog: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" })
        try {
            const idblog = req.body.idblog

            await Blogs.findOneAndUpdate({ _id: idblog}, {
                status: "Public"
            })

            res.status(200).json({msg: "Đã thêm blog vào blog riêng tư"})

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
      },

    getBlogById: async (req: Request, res: Response) => {
        var checklike = false;
        try {
            const { idblog } = req.params;
            const iduser = req.query.iduser;
            const blog = await Blogs.findOne({_id: idblog, status: "Public", is_detroy: false})
            .populate("poster", "_id name story location work learning createdAt avatar")
            .populate("tags", "_id name moderators")

            var tagblog = await blog.tags.map((tag:any) => tag._id.toString())

            const blogSameUser = await Blogs.find({poster: blog.poster._id, is_detroy: false, status: "Public", _id: { $ne: idblog }})
            .sort({ "createdAt": 1 })
            .limit(3)
            .populate("tags", "_id name")

            const blogSameTag = await Blogs.find({tags: {"$in": tagblog },is_detroy: false, status: "Public", _id: { $ne: idblog }})
            .populate("poster", "_id name story location work learning createdAt")
            .populate("tags", "_id name")
            .limit(4)
            .sort({ "likecount": 1 })

            if(iduser !== "undefined"){
                const checklikeuser = await Likes.findOne({idblog: idblog, iduser: iduser})
                if(checklikeuser){
                    var checklike = true;
                }
            }

            

            res.status(200).json({ blog, blogSameUser, blogSameTag, liked: checklike })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },

    modRemoveBlog: async (req: IReqAuth, res: Response) => {

        try {
            const { idblog, message } = req.body;
            await Blogs.findOneAndUpdate({_id: idblog}, 
                { is_detroy: true, removed: 
                    { idmod: req.user?._id, message: message }})

            res.status(200).json("ok")
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },


    viewBlog: async (req: IReqAuth, res: Response) => {
        try {
            const { idblog } = req.body;
            await Blogs.findOneAndUpdate({_id: idblog}, {$push: { viewer: req.user?._id.toString()}})
            res.status(200).json("ok")
        }  catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }

}

export default blogController;