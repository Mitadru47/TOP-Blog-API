const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController")

const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

/// USER ROUTES ///

// GET - User Detail
router.get("/user/:id", userController.user_detail);

/// POST ROUTES ///

// GET - Index
router.get("/", postController.index);

// GET - Dashboard
router.get("/dashboard", postController.dashboard);

// GET - Post Detail
router.get("/post/:id", postController.post_detail);

// POST - Publish/Unpublish Post
router.post("/post/:postid/publishStatus/:status", postController.publish_status);

// POST - Create Post
// router.post("/post/create", postController.create_post);

/// COMMENT ROUTES ///

// GET - Comment Detail
router.get("/post/:postid/comment/:commentid", commentController.comment_detail);

// POST - Create Comment
router.post("/post/:postid/comment/create", commentController.create_comment);

module.exports = router;