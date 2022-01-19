import { Request, Response, NextFunction } from "express";
import { IReqAuth } from "../config/interface";
import Blogs from "../models/blogModel";
import Users from "../models/userModel";
import Notifis from "../models/notifyModel";
import Comments from "../models/commentModel";
import bcrypt from "bcrypt";
import { object } from "joi";
import Tags from "../models/tagsModel";
import Reports from "../models/reportModel";
import { io } from "../index";

const userController = {
  // cập nhật trang cá nhân
  updateProfile: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
        const { name, story, location ,web_url, learning, work, education, } = req.body;

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          
          name,
          story,
          location,
          web_url,
          learning, 
          work, 
          education,
        
        }
      );

      res.json({ msg: "Cập nhật tài khoản thành công" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateProfileImage: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
        const { avatar } = req.body;

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          avatar
        }
      );

      res.json({ msg: "Cập nhật Ảnh đại diện thành công" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateProfileCover: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
        const { coverimage } = req.body;

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          coverimage
        }
      );

      res.json({ msg: "Cập nhật Ảnh Bìa thành công" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },


  resetPassword: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          password: passwordHash,
        }
      );

      res.json({ msg: "Đổi mật khẩu thành công" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // đổi mật khẩu
  changePassword: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    // if (req.user.type !== "register")
    //   return res
    //     .status(400)
    //     .json({ msg: "Chức năng không dành cho tài khoản đăng ký nhanh..." });
    try {
      const { password, passwordnew } = req.body;

      // const hassPassword = await bcrypt.hash(password, 12);
      const data = await Users.findOne({ _id: req.user._id });

      if (data) {
        bcrypt.compare(password, data.password, async (err, result) => {
          if (result) {
            const hassPassword = await bcrypt.hash(passwordnew, 12);
            await Users.findOneAndUpdate(
              { _id: data._id },
              {
                password: hassPassword,
              }
            );
            res.status(200).json({ msg: "Đổi mật khẩu thành công" });
          } else {
            return res.status(400).json({ msg: "Mật khẩu không chính xác" });
          }
        });
      }
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // theo dõi tag
  followTag: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { idtag } = req.body;
      const { my_tags } = req.user;
      const userExists = my_tags.some((tag) => tag.idtag == idtag);
      if (userExists) return res.status(400).json({ msg: "Truy vấn thất bại" });

      const result = await Users.findOneAndUpdate(
        { _id: req.user?._id.toString() },
        { $push: { my_tags: { idtag: idtag } } },
        { new: true }
      );
      return res.status(200).json({ result });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // bỏ theo dõi tag
  unfollowTag: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { idtag } = req.body;
      console.log(req.user?._id.toString());
      const { my_tags } = req.user;
      if (Array.isArray(my_tags)) {
        // kiểm tra xem người dùng có đang theo dõi thẻ tag này không, nếu không thì return
        const userExists = my_tags.some((tag) => tag.idtag == idtag);
        if (!userExists)
          return res.status(400).json({ msg: "Truy vấn thất bại" });
        const result = await Users.findOneAndUpdate(
          { _id: req.user?._id.toString() },
          { $pull: { my_tags: { idtag: idtag } } },
          { new: true }
        );
        return res.status(200).json({ result });
      }
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // theo dõi người dùng
  followUser: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { iduserfolow } = req.body;
      const { block_account, my_follow } = req.user;
      const newNotifi = new Notifis({
        message: `đã theo dõi bạn`,
        to_user: iduserfolow,
        from_user: req.user._id,
        type: `follow`,
      });
      // // check xem đã follow người đó chưa , nếu đã follow thì return
      if (my_follow.includes(iduserfolow))
        return res.status(400).json({ msg: "Truy vấn thất bại" });
      // // kiểm tra user muốn follow có trong danh sách chặn không, nếu có thì xóa user khỏi danh sách chặn
      if (block_account.includes(iduserfolow)) {
        await Users.findOneAndUpdate(
          { _id: req.user?._id.toString() },
          { $pull: { block_account: iduserfolow } }
        );
      }
      // thêm id user muốn follow vào danh sách
      await Users.findOneAndUpdate(
        { _id: req.user?._id.toString() },
        { $push: { my_follow: iduserfolow } }
      );

      const checkfollow = await Notifis.findOne({
        to_user: iduserfolow,
        from_user: req.user._id,
        type: `follow`,
      });
      if (!checkfollow) {
        newNotifi.save();
        io.sockets.in(`${iduserfolow}`).emit('new_noti', {msg: "noti"});
        
      }
      // cập nhật tổng số người theo dõi của user bạn follow
      await Users.findOneAndUpdate(
        { _id: iduserfolow },
        { $push: { follower: req.user?._id.toString() } }
      );
      return res.status(200).json({ msg: "Đã theo dõi người dùng" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // bỏ theo dõi nguwoif dùng
  unfollowUser: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { iduserfolow } = req.body;
      const { my_follow } = req.user;
      if (!my_follow.includes(iduserfolow))
        return res.status(400).json({ msg: "truy vấn thất bại" });
      await Users.findOneAndUpdate(
        { _id: req.user?._id.toString() },
        { $pull: { my_follow: iduserfolow } }
      );
      await Users.findOneAndUpdate(
        { _id: iduserfolow },
        { $pull: { follower: req.user?._id.toString() } }
      );
      return res.status(200).json({ msg: "Đã bỏ theo dõi người dùng" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // chặn người dùng
  blockUsers: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { iduser } = req.body;
      const { my_follow, block_account } = req.user;

      // kiểm tra xem có đang theo dõi người dùng này không, nếu có thì bỏ theo dõi
      // đồng thời cập nhật lại tổng số follower của người dùng đó
      if (my_follow.includes(iduser)) {
        await Users.findOneAndUpdate(
          { _id: req.user?._id.toString() },
          { $pull: { my_follow: iduser } }
        );
        await Users.findOneAndUpdate(
          { _id: iduser },
          { $inc: { follower: -1 } }
        );
      }
      // kiểm tra xem người dùng có nằm trong danh sách không, nếu đã nằm trong danh sách chặn thì return
      if (block_account.includes(iduser))
        return res.status(400).json({ msg: "Truy vấn thất bại" });

      await Users.findOneAndUpdate(
        { _id: req.user?._id.toString() },
        { $push: { block_account: iduser } }
      );
      return res.status(200).json({ msg: "Đã chặn người dùng" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //lưu bài
  savePost: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { idblog } = req.body;
      const { post_saved } = req.user;
      if (post_saved.includes(idblog))
        return res.status(400).json({ msg: "Truy vấn thất bại" });
      await Users.findOneAndUpdate(
        { _id: req.user?._id.toString() },
        { $push: { post_saved: idblog } }
      );
      await Blogs.findOneAndUpdate({ _id: idblog }, { $inc: { saved: 1 } });
      return res.status(200).json({ msg: "Đã lưu bài viết" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // hủy lưu bài
  unsavePost: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { idblog } = req.body;
      const { post_saved } = req.user;
      if (!post_saved.includes(idblog))
        return res.status(400).json({ msg: "Truy vấn thất bại" });
      await Users.findOneAndUpdate(
        { _id: req.user?._id.toString() },
        { $pull: { post_saved: idblog } }
      );
      await Blogs.findOneAndUpdate({ _id: idblog }, { $inc: { saved: -1 } });
      return res.status(200).json({ msg: "Đã hủy lưu bài viết" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // ưu tiên thẻ tag
  tagPriority: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { idtag, prioritizecount } = req.body;
      const { my_tags } = req.user;
      const userExists = my_tags.some((tag) => tag.idtag == idtag);
      if (!userExists)
        return res.status(400).json({ msg: "Truy vấn thất bại" });
      const abc = await Users.findOneAndUpdate(
        { _id: req.user?._id.toString(), "my_tags.idtag": idtag },
        { $set: { "my_tags.$.prioritize": prioritizecount } },
        { new: true }
      );
      return res.status(200).json({ msg: abc });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // ghim bài
  pinBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { idblog } = req.body;
      console.log(idblog)
      // kiểm tra xem tổng sôs bài viết được ghim là bao nhiêu
      const countpin = await Blogs.count({
        pin: true,
        poster: req.user._id.toString(),
      });
      // nếu quá 5 bài thì return
      if (countpin > 3)
        return res.status(400).json({ msg: "Tối đa 5 bài viết được ghim" });
      // kiểm tra bài viết đó đã được ghim chưa
      const checkblog = await Blogs.findOne({ pin: true, _id: idblog });
      // nếu rồi thì return
      if (checkblog)
        return res.status(400).json({ msg: "Bài viết đã được ghim" });
      // cập nhật field pin thành true
      await Blogs.findOneAndUpdate(
        { _id: idblog, poster: req.user._id.toString() },
        { pin: true }
      );

      return res.status(200).json({ msg: "Đã ghim bài viết" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // gỡ ghim bài
  unpinBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { idblog } = req.body;
      const checkblog = await Blogs.findOne({ pin: true, _id: idblog });

      if (!checkblog) return res.status(400).json({ msg: "Có lỗi sảy ra" });

      await Blogs.findOneAndUpdate(
        { _id: idblog, poster: req.user._id.toString() },
        { pin: false }
      );

      return res.status(200).json({ msg: "Đã gỡ ghim bài viết" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getProfile: async (req: IReqAuth, res: Response) => {
    try {
      const { id } = req.params;
      // lấy thông tin user
      const inforuser = await Users.findOne({
        _id: id,
      }).select(
        "-password -post_saved -my_follow -block_account -type -updatedAt -__v"
      );
      // lấy danh sách bài viết đã ghim
      const blogPin = await Blogs.find({
        poster: id,
        pin: true,
        is_detroy: false,
      })
        .populate("poster", "name _id story account avatar createdAt")
        .populate("tags", "name _id")
        .select("-content -pin -status -is_detroy -updatedAt -__v");
      // lấy số lượng bài viết đã đăng
      const blogPublishedCount = await Blogs.countDocuments({
        poster: id,
      }).exec();

      //
      const commentRecent = await Comments.find({
        user: id,
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("id_blog")
        .exec();

      // lấy số lượng cmt đã viết
      const commentsCount = await Comments.countDocuments({
        user: id,
      }).exec();

      // lấy số lượng tag đã theo dõi
      const tagfollowCount = inforuser?.my_tags.length;
      // trả về cho người dùng
      return res.status(200).json({
        userinfor: inforuser,
        blogPin,
        blogPublishedCount,
        commentsCount,
        tagfollowCount,
        commentRecent,
      });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // danh sách bài viết theo user ( bài k ghim )
  getBlogByUser: async (req: IReqAuth, res: Response) => {
    try {
      const { page, id } = req.params;
      const result = await Blogs.find({
        poster: id,
        pin: false,
        is_detroy: false,
        status: "Public"
      })
        .populate("poster", "name _id story account avatar createdAt")
        .populate("tags", "name _id")
        .select("-content -pin -status -is_detroy -updatedAt -__v")
        .sort({ createdAt: -1 })
        .limit(3)
        .skip(3 * (Number(page) - 1));
      return res.status(200).json({ result });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getnotification: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    let filterquery = {};
    try {
      const iduser = req.user._id;
      const type = req.query.type;
      const page = req.query.page;
      // console.log(iduser)
      switch (type) {
        case "all":
          filterquery = { to_user: iduser };
          break;
        case "comment":
          filterquery = { to_user: iduser, type: "comment" };
          break;
        case "blog":
          filterquery = { to_user: iduser, type: "blog" };
          break;
        case "like":
          filterquery = {
            $or: [ {type: "like"},{type: "follow"}],
            $and: [{
                to_user: iduser
            }]
        };
          break;
        // case "different":
        //   filterquery = { to_user: iduser, type: "different" };
        //   break;
      }
      const listnoti = await Notifis.find(filterquery)
        .populate(
          "idpost",
          "_id title poster tags likecount commentcount createdAt "
        )
        .populate({
          path: "idpost",
          populate: { path: "poster", select: "name _id" },
        })
        .populate({
          path: "idpost",
          populate: { path: "tags", select: "name _id" },
        })
        .populate("from_user", "_id name avatar")
        .sort({createdAt: -1})

      res.status(200).json({ listnoti });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  readingNoti:async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      await Notifis.updateMany({to_user: req.user?._id}, {is_reading: true})
      return res.status(200).json({msg: "ok"});
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getListBlogsaved: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const page = req.params.page;
      const listblogsaved = await Blogs.find({_id: { "$in": req.user.post_saved }, is_detroy: false, status:"Public"})
      .select("_id title poster tags createdAt")
      .limit(15)
      .skip(15 * (Number(page) - 1))
      .populate("poster", "_id name avatar")
      .populate("tags", "_id name")
      
      const count =  await Blogs.countDocuments({_id: { "$in": req.user.post_saved }, is_detroy: false, status:"Public"})

      res.status(200).json({listblogsaved, count})
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  searchBlogsaved:  async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const search = req.query.search
      const resultSearch = await Blogs.aggregate([
        {
          $search: {
            index: "searchTitleBlog",
            autocomplete: {
              query: `${search}`,
              path: "title",
            },
          },
        },
        {
          $match: {
            _id: { "$in": req.user.post_saved },
            status: "Public",
            is_detroy: false,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "poster",
            foreignField: "_id",
            as: "poster",
          },
        },
        { $unwind: "$poster" },
            {
              $lookup: {
                from: "tags",
                localField: "tags",
                foreignField: "_id",
                as: "tags",
              },
            },
            {
              $project: {
                _id: 1,
                title: 1,
                poster: {
                  _id: 1,
                  name: 1,
                  avatar: 1,
                },
                tags: {
                  _id: 1,
                  name: 1,
                },
                createdAt: 1,
              },
            },
      ])

      res.status(200).json({resultSearch})
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getHomeDashbroad:  async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const page = req.params.page;
      // lấy tổng số bình luận
      const totalComments = await Comments.countDocuments({
        user: req.user._id,
      }).exec();
      // lấy tổng số bài viết đã đăng
      const totalBlog = await Blogs.countDocuments({
        poster: req.user._id,
      }).exec();
      // tổng số lượt theo dõi
      const totalFollower = req.user.follower.length
      // tổng số bạn đang theo dõi
      const listBlog = await Blogs.find({poster: req.user._id, is_detroy : false, status: "Public", pin: false})
      .select("_id title createdAt likecount commentcount viewer saved status")
      .sort({"createdAt": -1})
      .limit(10)
      .skip(10 * (Number(page) - 1))
      res.status(200).json({
        totalComments, 
        totalBlog, 
        totalFollower, 
        listBlog
      })

    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getListPinblog: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      
      const listBlog = await Blogs.find({poster: req.user._id, is_detroy : false, status: "Public", pin: true})
      .select("_id title createdAt likecount commentcount viewer saved status")
      .sort({"createdAt": -1})

      res.status(200).json({listBlog})
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getListBlogPrivate: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      
      const listBlog = await Blogs.find({poster: req.user._id, is_detroy : false, status: "Private",})
      .select("_id title createdAt likecount commentcount viewer saved status")
      .sort({"createdAt": -1})

      res.status(200).json({listBlog})
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getListFollower: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      
      const listTags = await Users.find({_id: { "$in": req.user.follower }})
      .select("_id avatar name")

      res.status(200).json({listTags})
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getListUserMyFollow: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      
      const listUser = await Users.find({_id: { "$in": req.user.my_follow }})
      .select("_id avatar name")

      res.status(200).json({listUser})
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getTagFollow: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const listtagfollow = req.user.my_tags.map((tag) => tag.idtag)
      const listTags = await Tags.find({_id: { "$in": listtagfollow }})
      .select("_id name description total_blog")

      res.status(200).json({listTags})
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  reportUser: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { message, user_report } = req.body
      const newReport = new Reports({
        message,
        user_report,
        from_user: req.user._id,
        type: "user"
      })
      const checkReport = await Reports.findOne({user_report, from_user: req.user._id, type: "user"})
      if(checkReport){
        return res.status(400).json({msg: "Bạn đã báo cáo người dùng này trước đó, vui lòng chờ xử lý"})
      }
      await newReport.save()

      res.status(200).json({ msg: "Gửi yêu cầu báo cáo tài khoản thành công, vui lòng chờ xử lý" })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  reportBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { message, blog_report } = req.body
      const newReport = new Reports({
        message,
        blog_report,
        from_user: req.user._id,
        type: "blog"
      })
      const checkReport = await Reports.findOne({blog_report, from_user: req.user._id, type: "blog"})
      if(checkReport){
        return res.status(400).json({msg: "Bạn đã báo cáo Blog này trước đó, vui lòng chờ xử lý"})
      }
      await newReport.save()

      res.status(200).json({ msg: "Gửi yêu cầu báo cáo Blog thành công, vui lòng chờ xử lý" })
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getCountNotifiUnRead: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
      try {
          const countNoti = await Notifis.countDocuments({is_reading: false, to_user: req.user._id})
          res.status(200).json({countNoti})
      }catch (error: any) {
        return res.status(500).json({ msg: error.message });
      }
  }


};

export default userController;
