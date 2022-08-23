require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const blogsPostRoutes = require("./routes/blogspost");
const morgan = require("morgan");

// express app
const app = express();

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
    let port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`connected to db & listening on port ${8000}`);
    });
  })
  .catch((err) => {
    console.log(err, "the mongodb string is not correct");
  });
