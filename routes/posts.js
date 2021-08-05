const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor } = require("../middleware");
const multer = require("multer");

var upload = multer({ dest: "uploads/" });

const posts = require("../controllers/posts");

router
  .route("/")
  .get(isLoggedIn, catchAsync(posts.index))
  .post(isLoggedIn, upload.single("image"), catchAsync(posts.createPost));

router.get("/new", isLoggedIn, posts.new);

router
  .route("/:id")
  .get(isLoggedIn, catchAsync(posts.show))
  .put(
    isLoggedIn,
    isAuthor,
    upload.single("image"),
    catchAsync(posts.updatePost)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(posts.deletePost));

router.route("/new").get(isLoggedIn, catchAsync(posts.new));

module.exports = router;
