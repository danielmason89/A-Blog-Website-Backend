require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;
const express = require("express");
const mongoose = require("mongoose");
const blogsPostRoutes = require("./routes/blogspost");
const morgan = require("morgan");

// express app
const app = express();

// register view engine
// app.set("view engine", "ejs");

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/blogposts", blogsPostRoutes);

// connect to db
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT || 4000, () => {
      return console.log(`connected to db & listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err, "the mongodb string is not correct");
  });
