import express from "express";
// controller functions
import { subscribeUser, loginUser } from "../controllers/userController.ts";

const router = express.Router();

// login route
router.post("/login", loginUser);

// sign-up route
router.post("/subscribe", subscribeUser);

export default router;
