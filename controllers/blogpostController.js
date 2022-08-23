const Blogpost = require("../models/blogpostModel");
const mongoose = require("mongoose");

// Get all blog posts
const getBlogposts = async (req, res) => {
  const blogposts = await Blogpost.find({}).sort({ createdAt: -1 });
  res.status(200).json(blogposts);
};

// Get a single blogpost
const getBlogpost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such blogpost" });
  }
  const blogpost = await Blogpost.findById(id);

  if (!blogpost) {
    return res.status(404).json({ error: "no such blogpost" });
  }
  res.status(200).json(blogpost);
};

// Create a blogpost
const createBlogpost = async (req, res) => {
  const { title, author, body } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!body) {
    emptyFields.push("body");
  }

  if (!author) {
    emptyFields.push("author");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  //   add doc to db
  try {
    const blogpost = await Blogpost.create({ title, author, body });
    res.status(200).json(blogpost);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// Delete a blogpost
const deleteBlogpost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such blogpost" });
  }
  const blogpost = await Blogpost.findOneAndDelete({ _id: id });
  if (!blogpost) {
    return res.status(400).json({ error: "no such blogpost" });
  }
  res.status(200).json(blogpost);
};

// Update a blogpost
const updateBlogpost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such blogpost" });
  }

  const blogpost = await Blogpost.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!blogpost) {
    return res.status(400).json({ error: "no such blogpost" });
  }
  res.status(200).json(blogpost);
};

module.exports = {
  getBlogposts,
  getBlogpost,
  createBlogpost,
  deleteBlogpost,
  updateBlogpost,
};
