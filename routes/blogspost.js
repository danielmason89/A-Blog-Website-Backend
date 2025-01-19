const express = require("express");
const router = express.Router();
const {
  createBlogpost,
  getBlogposts,
  getBlogpost,
  deleteBlogpost,
  updateBlogpost,
} = require("../controllers/blogpostController");
const requireAuth = require("../middleware/requireAuth");

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

module.exports = router;
