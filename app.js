const express = require('express')
const PORT = process.env.PORT || 5000

const cors = require("cors");
const mongoose = require("mongoose");
const blogsPostRoutes = require("./routes/blogspost");
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

app.get("/api/status", (req, res) => {
  return res.json({});
});

// routes
app.use("/api/blogposts", blogsPostRoutes);

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


