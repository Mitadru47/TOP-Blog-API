const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController")

const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

/////////////////////////////////////// Blog API - Public ///////////////////////////////////////

/// USER ROUTES ///

// GET - User Detail
router.get("/user", userController.user_detail);

/// POST ROUTES ///

// GET - Header
router.get("/header", postController.indexHeader);

// GET - Index
router.get("/", postController.index);

// GET - Post Detail
router.get("/post/:id", postController.post_detail);

/// COMMENT ROUTES ///

// GET - Comment Detail
router.get("/post/:postid/comment/:commentid", commentController.comment_detail);

// POST - Create Comment
router.post("/post/:postid/comment/create", commentController.create_comment);

module.exports = router;