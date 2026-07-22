import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

router.route("/")
  .get(getBlogs)
  .post(createBlog);

router.route("/:slug")
  .get(getBlogBySlug)
  .put(updateBlog)
  .delete(deleteBlog);

export default router;