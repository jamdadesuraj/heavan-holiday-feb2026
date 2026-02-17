import { Request, Response } from "express"
import { userInterface } from "../../middlewares/userInterface";
import { BlogComments } from "./blogsComment.Model"

export const addComment = async (req: userInterface, res: Response) => {

    try {

        const userId = req.user._id; 
        const { blogId } = req.params;
        const { comment } = req.body;

        const blogComment = await BlogComments.create({
            blog: blogId,
            user: userId,
            comment
        })

        return res.status(203).json({ message: "Comment saved", data: blogComment })

    } catch (error) {
        res.status(500).json({ message: "INTERNAL SERVER ERROR", err: error })
    }
}

export const getBlogComments = async (req: Request, res: Response) => {
    try {
        const { blogId } = req.params;

        const comments = await BlogComments.find({
            blog: blogId,
            isDeleted: false,
            status: "visible",
        })
            .populate("user", "name avatar")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: comments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch comments",
            error,
        });
    }
};

export const getAllComments = async (req: Request, res: Response) => {
    try {
        const { status, blogId, userId, page = 1, limit = 10 } = req.query;

        const filter: any = {
            isDeleted: false,
        };

        if (status) filter.status = status;
        if (blogId) filter.blog = blogId;
        if (userId) filter.user = userId;

        const skip = (Number(page) - 1) * Number(limit);

        const comments = await BlogComments.find(filter)
            .populate("user", "name avatar")
            .populate("blog", "title")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const total = await BlogComments.countDocuments(filter);

        res.json({
            success: true,
            data: comments,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                pages: Math.ceil(total / Number(limit)),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch comments",
            error,
        });
    }
};

