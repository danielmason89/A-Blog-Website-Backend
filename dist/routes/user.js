"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// controller functions
const userController_js_1 = require("../controllers/userController.js");
const router = express_1.default.Router();
// login route
router.post("/login", userController_js_1.loginUser);
// sign-up route
router.post("/subscribe", userController_js_1.subscribeUser);
exports.default = router;
