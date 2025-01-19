const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

const blogsPostRoutes = require("./routes/blogspost");
const userRoutes = require("./routes/user");
const morgan = require("morgan");

// express app
app.use(express.static("public"));

// CORS Setup
const whitelist = [
  "http://localhost:3000",
  "https://daniel-mason-blog.netlify.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

// Enable preflight across-the-board
app.options("*", cors(corsOptions));

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

// Logging middleware for debugging each request
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.get("/", (req, res) => {
  return res.json("server start");
});

app.get("/api/status", (req, res) => {
  return res.json({});
});

app.use("/api/blogposts", blogsPostRoutes);
app.use("/api/user", userRoutes);

// --- MongoDB Connection ---
// connect to db
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log(`connected to db & listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err, "the mongodb string is not correct");
  });
