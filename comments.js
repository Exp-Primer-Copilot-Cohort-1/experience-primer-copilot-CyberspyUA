//Create web server
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

//Create web server
const server = require("http").Server(app);
const io = require("socket.io")(server);

//Connect to DB
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Create Schema
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Comment = new Schema({
  username: String,
  content: String,
  createTime: Date
});

const CommentModel = mongoose.model("Comment", Comment);

//Set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Set body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Set cookie-parser
app.use(cookieParser());

//Set session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);

//Set router
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/comments", (req, res) => {
  CommentModel.find({}, (err, comments) => {
    if (err) throw err;
    res.json(comments);
  });
});

app.post("/comments", (req, res) => {
  const comment = new CommentModel({
    username: req.body.username,
    content: req.body.content,
    createTime: new Date()
  });
  comment.save((err, comment) => {
    if (err) throw err;
    res.json(comment);
  });
});

//Set socket.io
io.on("connection", socket => {
  socket.on("postComment", data => {
    io.emit("newComment", data);
  });
});

//Listen port
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});