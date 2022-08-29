const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

const cors = require("cors");
const mongoose = require("mongoose");
const blogsPostRoutes = require("./routes/blogspost");
const userRoutes = require("./routes/user");
const morgan = require("morgan");

// express app
const app = express();

// // middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  return res.json("server start");
});

app.get("/api/status", (req, res) => {
  return res.json({});
});

// routes
app.use("/api/blogposts", blogsPostRoutes);
app.use("/api/user", userRoutes);

// connect to db
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
