import express from "express";
import {
  addComment,
  getBlogComments,
  getAllComments,
} from "./blogsComment.controller";

import { auth } from "../../middlewares/authMiddleware";

const router = express.Router();


// ✅ Add Comment (Logged-in users)
router.post(
  "/:id",
  auth(),
  addComment
);


// ✅ Get Comments of a Blog (Public)
router.get(
  "/:id",
  auth(),
  getBlogComments
);


// ✅ Get All Comments (Admin Panel / Moderation)
router.get(
  "/",
  auth(),
  getAllComments
);

export const blogsCommentsRouter = router;
