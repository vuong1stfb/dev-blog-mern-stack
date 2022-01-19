import { Request, Response, NextFunction } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";
import Blogs from "../models/blogModel";
import Tags from "../models/tagsModel";
import Likes from "../models/likeModel";
import Comments from "../models/commentModel";
import moment from "moment";

const tagsController = {
    getBlogbytag: async (req: Request, res: Response) => {
        try {
            const { page, id } = req.params
            const { sort } = req.query
            const blogbytag =  await Blogs.find({ "tags": { "$in": id }, is_detroy: false} )
            .populate("tags")
            .populate("poster")
            .sort({"createdAt": Number(sort)})
            .limit(3)
            .skip(3 * (Number(page) - 1));
            res.status(200).json({ blogbytag })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    },

    getInforTags: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const infortag = await Tags.findOne({_id: id})
            .populate("moderators")
 
            const favoritePosts = await Blogs.find({ "tags": { "$in": id }, is_detroy: false})
            .populate("poster")
            .sort({"likecount": -1})
            .limit(3)
            res.status(200).json({ infortag, favoritePosts })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    },

    getListtag: async (req: Request, res: Response) => {
        try {
            const listtag = await Tags.find({is_destroy: false}).sort({"total_blog": -1})
            res.status(200).json({ listtag })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    },

    getListtagtop: async (req: Request, res: Response) => {
        try {
            const listtag = await Tags.find({}).sort({"total_blog": -1})
            res.status(200).json({ listtag })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
};

export default tagsController;
