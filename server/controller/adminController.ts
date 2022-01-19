import { Request, Response, NextFunction } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";
import Blogs from "../models/blogModel";
import Tags from "../models/tagsModel";
import bcrypt from "bcrypt";
import Reports from "../models/reportModel";

const adminController = {
  // tạo tag
  createTags: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });

    try {
      const { name, description, moderators, abount, logo } = req.body;
      // kiểm tra tag đã tồn tại hay chưa
      const checktag = await Tags.findOne({
        name: { $regex: `^${name}$`, $options: "i" },
      });
      // // nếu tồn tại
      if (checktag) return res.status(400).json({ msg: "Thẻ Tag đã tồn tại" });
      // // tìm trong db các user được add quản trị tag
      // const checkuser = await Users.find({ _id: { $in: moderators } }, objuser);
      // // kiểm tra xem user có role là quản trị viên hay không
      // for (let i = 0; i < checkuser.length; i++) {
      //   if (checkuser[i].role !== "moderators") {
      //     return res
      //       .status(400)
      //       .json({
      //         msg: `Bạn cần thêm quyền Quản trị viên cho user ${checkuser[i].name} trước`,
      //       });
      //   }
      // }
      const newTag = new Tags({
        name,
        description,
        moderators,
        abount,
      });

      await newTag.save();
      return res.status(200).json({ msg: "Đã thêm 1 Thẻ Tag mới" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateTags: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { id, name, desc, abount, moderators } = req.body;
      // update role
      await Tags.findOneAndUpdate(
        { _id: id },
        {
          name,
          description: desc,
          abount,
          moderators,
        }
      );
      return res.status(200).json({ msg: "Cập nhật thông tin thành công" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // thêm quản trị
  addmoderators: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { iduser } = req.body;
      // update role
      const user =  await Users.findOneAndUpdate(
        { _id: iduser },
        {
          role: "moderators",
        },
        { new: true }
      );
      return res.status(200).json({ user });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  removedmod: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { iduser } = req.body;
      // update role
      await Users.findOneAndUpdate(
        { _id: iduser },
        {
          role: "user",
        }
      );
      return res.status(200).json({ msg: "Đã hủy quản trị page" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // loại bỏ quản trị viên khỏi tag
  removeModForTag: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { idmod, idtags } = req.body;
      const moder = await Tags.findOne(
        { _id: idtags },
        { _id: 0, description: 0, createdAt: 0, updatedAt: 0, __v: 0 }
      );
      // nếu quản trị viên đã có trong tag
      if (moder.moderators.indexOf(idmod) !== -1) {
        await Tags.findOneAndUpdate(
          { _id: idtags },
          {
            $pull: { moderators: idmod },
          }
        );

        return res.status(200).json({ msg: `Đã xóa Quản trị viên khỏi thẻ` });
      } else {
        return res.status(400).json({ msg: `Quản trị viên không tồn tại` });
      }
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  lockTag: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { idtags } = req.body;
      await Tags.findOneAndUpdate({ _id: idtags }, { is_destroy: true });
      return res.status(200).json({ msg: "Đã khóa thẻ tag" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  unlockTag: async (req: IReqAuth, res: Response) => {
    if (!req.user) return res.status(400).json({ msg: "Xác thực thất bại" });
    try {
      const { idtags } = req.body;
      await Tags.findOneAndUpdate({ _id: idtags }, { is_destroy: false });
      return res.status(200).json({ msg: "Đã mở khóa thẻ tag" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getListtagadmin: async (req: IReqAuth, res: Response) => {
    try {
      const listtag = await Tags.find({}).sort({createdAt: -1}).populate("moderators", "-password");

      const listmod = await Users.find({ role: "moderators" });

      return res.status(200).json({ listtag, listmod });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getHomeDashbroadAdmin: async (req: IReqAuth, res: Response) => {
    try {
      const tagCount = await Tags.countDocuments({});
      const blogCount = await Blogs.countDocuments({});
      const userCount = await Users.countDocuments({});

      const interactive = await Blogs.aggregate([
        {
          $group : {
              _id: null,
              amount: { $sum: { $add : [ 
                  '$commentcount', '$likecount' , '$saved' 
              ]}},
          }
      },
      {
        $project: {
          amount: 1
        }
      }
      ]);

      return res.status(200).json({ tagCount, blogCount, userCount, interactive });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getListUsermanager: async (req: IReqAuth, res: Response) => {
    var searchresult = [];
    try {
      const searchvalue = req.query.searchvalue;

      switch(searchvalue){
        case "":
          var searchresult = await Users.aggregate([
            {$sort:{createdAt:-1}},
            {'$match': {'role': {'$ne': 'admin'}}},
            {
              $project: {
                _id: 1,
                name: 1,
                story: 1,
                location: 1,
                web_url: 1,
                learning: 1,
                work: 1,
                education: 1,
                account:1,
                role: 1,
                avatar: 1,
                is_destroy: 1,
                createdAt: 1,
                updatedAt: 1
              }
            }
          ]);

          break;
        default: 
        var searchresult = await Users.aggregate([
          {
            $search: {
              index: "nameUser",
              autocomplete: {
                query: `${searchvalue}`,
                path: "name",
              },
            },
          },
          {'$match': {'role': {'$ne': 'admin'}}},
          {
            $project: {
              _id: 1,
              name: 1,
              story: 1,
              location: 1,
              web_url: 1,
              learning: 1,
              work: 1,
              education: 1,
              account:1,
              role: 1,
              avatar: 1,
              is_destroy: 1,
              createdAt: 1,
              updatedAt: 1
            }
          }
        ]);
      }
      res.status(200).json({searchresult})  
    }catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  lockUser: async (req: IReqAuth, res: Response) => {
    try {
      const userid = req.body.userid;

      const user = await Users.findOneAndUpdate({_id: userid}, {is_destroy: true}, {new: true})
      res.status(200).json({user})
    }catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }

  },

  unlockUser: async (req: IReqAuth, res: Response) => {
    try {
      const userid = req.body.userid;

      const user = await Users.findOneAndUpdate({_id: userid}, {is_destroy: false}, {new: true})
      res.status(200).json({user})
    }catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }

  },

  getReport: async (req: IReqAuth, res: Response) => {
    try {
      const reports = await Reports.find({ report_process: false})
      .populate('blog_report', "_id title")
      .populate('user_report', "_id name avatar")
      .populate("from_user", "_id name avatar")
      .sort({"createdAt": -1})

      return res.status(200).json({reports})
    }catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }

  },

  readReport: async (req: IReqAuth, res: Response) => {
    try {
      await Reports.findOneAndUpdate({_id: req.body.idreport}, {report_process: true})

      return res.status(200).json({msg: "ok"})
    }catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }

  },

  getListmod: async (req: IReqAuth, res: Response) => {
    try {
        const listmod = await Users.find({role: "moderators"})
        return res.status(200).json({listmod})
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getBlogremoved: async (req: IReqAuth, res: Response) => {
    try {
        const blogremoved = await Blogs.find({is_detroy: true, removed: {"$exists":true} }).select("_id title imagepost")
        .populate("removed.idmod", "_id name avatar role")
        .populate("poster", "_id name avatar role")

        return res.status(200).json({blogremoved})
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  }

  


};

export default adminController;
