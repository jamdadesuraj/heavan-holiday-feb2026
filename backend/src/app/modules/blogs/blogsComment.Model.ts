import mongoose, { Schema } from "mongoose";
import { BlogCommentDocument } from "./blogsInterface";

const BlogCommentSchema = new Schema<BlogCommentDocument>(
    {
        blog: {
            type: Schema.Types.ObjectId,
            ref: "BlogPost",
            required: [true, "Blog reference required"],
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User reference required"],
        },

        comment: {
            type: String,
            required: [true, "Comment text required"],
            trim: true,
        },

        status: {
            type: String,
            enum: ["visible", "hidden"],
            default: "visible",
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const BlogComments = mongoose.model<BlogCommentDocument>(
    "blogComments",
    BlogCommentSchema
)

BlogCommentSchema.index({ blog: 1, createdAt: -1 });
BlogCommentSchema.index({ user: 1 });
BlogCommentSchema.index({ status: 1 });
