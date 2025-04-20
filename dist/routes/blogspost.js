"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogpostController_js_1 = require("../controllers/blogpostController.js");
const requireAuth_js_1 = __importDefault(require("../middleware/requireAuth.js"));
const router = express_1.default.Router();
// Public GET endpoints (no authentication required)
// Get all blog posts
router.get("/", blogpostController_js_1.getBlogposts);
// Get a single blog posts
router.get("/:id", blogpostController_js_1.getBlogpost);
// require auth for these blogpost routes
router.use(requireAuth_js_1.default);
// Post a new blog post
router.post("/", blogpostController_js_1.createBlogpost);
// Delete a blog post
router.delete("/:id", blogpostController_js_1.deleteBlogpost);
// update a new blog post
router.patch("/:id", blogpostController_js_1.updateBlogpost);
exports.default = router;
