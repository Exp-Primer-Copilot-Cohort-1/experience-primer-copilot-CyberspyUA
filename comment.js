//Create web server
const express = require("express");
const app = express();
//Create body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Create mongoose
const mongoose = require("mongoose");
//Connect to database
mongoose.connect("mongodb://localhost:27017/Comment", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Create schema
const commentSchema = new mongoose.Schema({
  name: String,
  content: String,
});
//Create model
const Comment = mongoose.model("Comment", commentSchema);
//Create static file
app.use(express.static("public"));
//Create template engine
app.set("view engine", "ejs");
//Create route
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/comment", (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comment", { comments: comments });
    }
  });
});
app.post("/comment", (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    content: req.body.content,
  });
  comment.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/comment");
    }
  });
});
//Listen port
app.listen(3000, () => console.log("Server started on port 3000"));const express = require("express");
const app = express();
//Create body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Create mongoose
const mongoose = require("mongoose");
//Connect to database
mongoose.connect("mongodb://localhost:27017/Comment", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Create schema
const commentSchema = new mongoose.Schema({
  name: String,
  content: String,
});
//Create model
const Comment = mongoose.model("Comment", commentSchema);
//Create static file
app.use(express.static("public"));
//Create template engine
app.set("view engine", "ejs");
//Create route
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/comment", (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comment", { comments: comments });
    }
  });
});
app.post("/comment", (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    content: req.body.content,
  });
  comment.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/comment");
    }
  });
});
//Listen port
app.listen(3000, () => console.log("Server started on port 3000"));