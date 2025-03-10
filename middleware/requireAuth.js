const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // For debugging: log the request path and method
  console.log("requireAuth middleware running for:", req.method, req.path);

  // Verify the presence of an Authorization header
  const { authorization } = req.headers;

  if (!authorization) {
    console.log("No authorization header found");
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = await User.findOne({ _id: decoded._id }).select("_id");
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ error: "Request is not authorized." });
  }
};

module.exports = requireAuth;
