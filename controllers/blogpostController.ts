import { type Request, type Response, type NextFunction } from "express";
import Blogpost from "../models/blogpostModel.js";
import mongoose from "mongoose";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
}).strict(); 

// Get a single blogpost
export const getBlogpost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const blogpost = await Blogpost.findById(id);
    res.status(200).json(blogpost);
  } catch (error) {
    next(res.status(500).json({ error: "Failed to fetch blog post"}));
  }
};

// Get all blog posts
export const getBlogposts = async (req: Request, res: Response) => {
  try {
    const blogposts = await Blogpost.find({}).sort({ createdAt: -1 });
    res.status(200).json(blogposts);
  } catch (err) {
    res.status(500).json({ error: "could not fetch the data for that resource" });
  }
};

// Create a blogpost
export const createBlogpost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, body, tags = [], status = "draft" } = req.body;
    let emptyFields = [];

    if (!title) {
      emptyFields.push("title");
    }
    if (!body) {
      emptyFields.push("body");
    }

    const author = req.user?._id;
    if (!author) {
      res.status(401).json({ error: "Request not authorized." });
      return;
    }

    if (emptyFields.length > 0) {
      next(res.status(400).json({ error: "Please fill in all the fields.", emptyFields }));
    }
    //add doc to db
    const blogpost = await Blogpost.create({ title, author, body });
    res.status(200).json(blogpost);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: (err as Error).message})
    } else {
      res.status(400).json({ error: "An unknown error occurred."});
    }
  }
};

// Delete a blogpost
export const deleteBlogpost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "no such blogpost is here." });
    }
    const blogpost = await Blogpost.findOneAndDelete({ _id: id });
    if (!blogpost) {
      res.status(400).json({ error: "no such blogpost exist." });
    }
    res.status(200).json(blogpost);
  } catch(error) {
    next(res.status(500).json({ error: "Failed to delete blog post, or it's already been deleted"}));
  }
};

// Update a blogpost
export const updateBlogpost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "no such blogpost exist in the database" });
    }
    
    const parsed = updateSchema.parse(req.body);
    const blogpost = await Blogpost.findOneAndUpdate(
      { _id: id },
      { $set: parsed },
      { new: true, runValidators: true }
    );
    if (!blogpost) {
      res.status(400).json({ error: "no such blogpost to update" });
    }
    res.status(200).json(blogpost);
  } catch(error) {
    next(res.status(500).json({ error: "Failed to update the blog post"}));
  }
};