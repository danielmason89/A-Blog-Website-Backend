import { type Request, type Response } from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.JWT || "", { expiresIn: "3d" });
};

// login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // create a token
    const token = createToken((user as { _id: string})._id.toString());
    res.status(200).json({ email, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: (error as Error).message})
    } else {
      res.status(400).json({ error: "An unknown error occurred."});
    }
  }
};

// subscribe user
export const subscribeUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("email123", req.body);
  try {
    const user = await User.signup(email, password);
    // create a token
    const token = createToken((user as { _id: string})._id.toString());
    res.status(200).json({ email, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: (error as Error).message})
    } else {
      res.status(400).json({ error: "An unknown error occurred."});
    }
  }
};