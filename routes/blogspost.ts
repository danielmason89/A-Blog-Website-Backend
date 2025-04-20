import express from "express";
import {
  createBlogpost,
  getBlogposts,
  getBlogpost,
  deleteBlogpost,
  updateBlogpost,
} from "../controllers/blogpostController.ts";
import requireAuth from "../middleware/requireAuth.ts";

const router = express.Router();

// Public GET endpoints (no authentication required)
// Get all blog posts
router.get("/", getBlogposts);
// Get a single blog posts
router.get("/:id", getBlogpost);

// require auth for these blogpost routes
router.use(requireAuth);
// Post a new blog post
router.post("/", createBlogpost);
// Delete a blog post
router.delete("/:id", deleteBlogpost);
// update a new blog post
router.patch("/:id", updateBlogpost);

export default router;
