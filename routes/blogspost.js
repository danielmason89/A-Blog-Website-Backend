const express = require("express");
const {
  createBlogpost,
  getBlogposts,
  getBlogpost,
  deleteBlogpost,
  updateBlogpost,
} = require("../controllers/blogpostController");
const router = express.Router();

// home
// router.get("/", (req, res) => {
//   res.json({ mssg: "homepage, yayy!!" });
// });

// // about page
// router.get("/about", (req, res) => {
//   res.json({ mssg: "aboutpage, yayy!!" });
// });

// Get all blog posts
router.get("/", getBlogposts);
// Get a single blog posts
router.get("/:id", getBlogpost);
// Post a new blog post
router.post("/", createBlogpost);
// Delete a blog post
router.delete("/:id", deleteBlogpost);
// update a new blog post
router.patch("/:id", updateBlogpost);

module.exports = router;
