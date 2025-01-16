const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

const cors = require("cors");

const blogsPostRoutes = require("./routes/blogspost");
const userRoutes = require("./routes/user");
const morgan = require("morgan");

// express app
const app = express();

// // middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

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
