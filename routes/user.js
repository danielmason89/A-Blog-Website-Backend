const express = require("express");

// controller functions
const { subscribeUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// sign-up route
router.post("/subscribe", subscribeUser);

module.exports = router;
