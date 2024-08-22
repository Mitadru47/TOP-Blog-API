const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

/////////////////////////////////////// Blog API - Private ///////////////////////////////////////

/// USER ROUTES ///

// GET - User Detail
router.get("/user", userController.user_detail);

// POST - Edit User Detail 

/// POST ROUTES ///

// GET - Dashboard
router.get("/", postController.dashboard);

// POST - Publish Status
router.post("/post/:postid/publishStatus/:status", postController.publish_status);

// GET -  Post Detail
router.get("/post/:id", postController.post_detail);

// POST - Create Post
// POST - Edit Post
// POST - Delete Post

/// COMMENT ROUTES ///

// GET - Comment Detail
// POST - Create Comment
// POST - Edit Comment
// POST - Delete Comment

module.exports = router;