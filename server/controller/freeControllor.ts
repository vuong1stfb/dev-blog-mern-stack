import { Request, Response, NextFunction } from "express";
import { IReqAuth } from "../config/interface";
import Blogs from "../models/blogModel";
import Users from "../models/userModel";
import Comments from "../models/commentModel";
import bcrypt from "bcrypt";
import Tags from "../models/tagsModel";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const freeController = {
  getListHomePage: async (req: IReqAuth, res: Response) => {
    var datablog = [];
    let filterquery = {};
    try {
      const filter = req.query.filter;
      const page = req.query.page;
      const skip = 2 * (Number(page) - 1);
      switch (filter) {
        case "new":
          filterquery = { createdAt: -1 };
          break;
        case "old":
          filterquery = { createdAt: 1 };
          break;
        case "top":
          filterquery = { interactive: -1 };
          break;
        case "follow":
          const mytagarray = req.user?.my_tags.map((tag) => tag.idtag);
          var datablog = await Blogs.aggregate([
            { $match: { poster: { $ne: req.user?._id } } },
            {
              $match: {
                $and: [
                  {
                    $or: [
                      { tags: { $in: mytagarray } },
                      { poster: { $in: req.user?.my_follow } },
                    ],
                  },
                  { is_detroy: false },
                  {status: "Public"}
                ],
              },
            },
            { $sort: { createdAt: -1 } },
            { $skip: 2 * (Number(page) - 1) },
            { $limit: 2 },
            {
              $lookup: {
                from: "users",
                localField: "poster",
                foreignField: "_id",
                as: "poster",
              },
            },
            {
              $unwind: "$poster",
            },
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
                content: 1,
                title: 1,
                description: 1,
                imagepost: 1,
                poster: {
                  _id: 1,
                  name: 1,
                  avatar: 1,
                  story: 1,
                  createdAt: 1,
                },
                tags: {
                  _id: 1,
                  name: 1,
                },
                likecount: 1,
                commentcount: 1,
                createdAt: 1,
                viewer: 1,
              },
            },
          ]);

          break;
      }
      if (filter !== "follow") {
        var datablog = await Blogs.aggregate([
          {
            $addFields: {
              interactive: { $sum: ["$likecount", "$commentcount"] },
            },
          },
          {
            $match: {
              is_detroy: false,
              status: "Public"
            },
          },
          { $sort: filterquery },
          { $skip: 2 * (Number(page) - 1) },
          { $limit: 2 },

          {
            $lookup: {
              from: "users",
              localField: "poster",
              foreignField: "_id",
              as: "poster",
            },
          },
          {
            $unwind: "$poster",
          },
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
              content: 1,
              title: 1,
              description: 1,
              imagepost: 1,
              poster: {
                _id: 1,
                name: 1,
                avatar: 1,
                story: 1,
                createdAt: 1,
              },
              tags: {
                _id: 1,
                name: 1,
              },
              likecount: 1,
              commentcount: 1,
              createdAt: 1,
              viewer: 1,
            },
          },
        ]);
      }

      return res.status(200).json({ datablog });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getBlogTallestinTag: async (req: IReqAuth, res: Response) => {
    try {
      const listBlogtag = await Tags.aggregate([
        { $sort: { total_blog: -1 } },
        { $limit: 3 },
        {
          $lookup: {
            from: "blogs",
            localField: "_id",
            foreignField: "tags",
            as: "productList",
          },
        },
        { $unwind: "$productList" },
        { $sort: { "productList.createdAt": -1 } },
        {
          $match: {
            $and: [
              { "productList.status": "Public" },
              { "productList.is_detroy": false },
            ],
          },
        },
        {
          $group: {
            _id: "$_id",
            namecategory: { $first: "$name" },
            listpost: { $push: "$productList" },
          },
        },
        { $sort: { _id: 1 } },
        {
          $project: {
            listpost: {
              $slice: ["$listpost", 0, 3],
            },
            namecategory: 1,
          },
        },
      ]);

      return res.status(200).json({ listBlogtag });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },

  search: async (req: Request, res: Response) => {
    var searchresult = [];
    try {
      const { type, iduser, searchvalue, page } = req.query;

      switch (type) {
        case "blog":
          var searchresult = await Blogs.aggregate([
            {
              $search: {
                index: "searchTitleBlog",
                autocomplete: {
                  query: `${searchvalue}`,
                  path: "title",
                },
              },
            },
            {
              $match: {
                status: "Public",
                is_detroy: false,
              },
            },
            { $skip: 2 * (Number(page) - 1) },
            { $limit: 2 },
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
                  story: 1,
                  location: 1,
                  web_url: 1,
                  learning: 1,
                  work: 1,
                  education: 1,
                  avatar: 1,
                },
                tags: {
                  _id: 1,
                  name: 1,
                },
                createdAt: 1,
                likecount: 1,
                commentcount: 1
              },
            },
          ]);
          break;

        case "comment":
          var searchresult = await Comments.aggregate([
            {
              $search: {
                index: "contentComment",
                autocomplete: {
                  query: `${searchvalue}`,
                  path: "content",
                },
              },
            },
            { $skip: 2 * (Number(page) - 1) },
            { $limit: 2 },
            {
              $lookup: {
                from: "blogs",
                localField: "id_blog",
                foreignField: "_id",
                as: "blog",
              },
            },
            { $unwind: "$blog" },
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
              },
            },
            { $unwind: "$user" },
            {
              $project: {
                _id: 1,
                content: 1,
                likecount: 1,
                user_like: 1,
                createdAt: 1,
                user: {
                  _id: 1,
                  name: 1,
                  story: 1,
                  location: 1,
                  web_url: 1,
                  learning: 1,
                  work: 1,
                  education: 1,
                  avatar: 1,
                },
                blog: {
                  _id: 1,
                  title: 1,
                },
              },
            },
          ]);
          break;

        // tìm kiếm user
        case "user":
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
            {
              $match: {
                is_destroy: false,
              },
            },
            { $skip: 2 * (Number(page) - 1) },
            { $limit: 2 },
            {
              $project: {
                _id: 1,
                name:1,
                story: 1,
                follower: 1,
                avatar: 1,
                createdAt: 1
              }
            }
          ]);
          break;
        
        case "myblog":
          var searchresult = await Blogs.aggregate([
            {
              $search: {
                index: "searchTitleBlog",
                autocomplete: {
                  query: `${searchvalue}`,
                  path: "title",
                },
              },
            },
            {
              $match: {
                poster: new mongoose.Types.ObjectId(`${iduser}`),
                status: "Public",
                is_detroy: false,
              },
            },
            { $skip: 2 * (Number(page) - 1) },
            { $limit: 2 },
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
                  story: 1,
                  location: 1,
                  web_url: 1,
                  learning: 1,
                  work: 1,
                  education: 1,
                  avatar: 1,
                },
                tags: {
                  _id: 1,
                  name: 1,
                },
                createdAt: 1,
                likecount: 1,
                commentcount: 1
              },
            },
          ])
          break;
      }

      return res.status(200).json({ searchresult });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default freeController;
