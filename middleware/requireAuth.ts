import jwt, { type JwtPayload } from "jsonwebtoken";
import User from "../models/userModel.js";
import { type NextFunction, type Request, type Response } from "express";

const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Verify the presence of an Authorization header
  const { authorization } = req.headers;
  if (!authorization) {
    console.log("No authorization header found");
    res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization!.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT || "");
    if (typeof decoded === "object" && decoded !== null && "_id" in decoded) {
      const user = await User.findOne({ _id: (decoded as JwtPayload)._id }).select("_id") as { _id: string } | null;

      if (!user) {
        res.status(401).json({ error: "User not found" });
      }

      req.user = { _id: user!._id.toString() };
      next();
    } else {
      throw new Error("Invalid token payload");
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    next(res.status(401).json({ error: "Request is not authorized." }));
  }
};

export default requireAuth;
