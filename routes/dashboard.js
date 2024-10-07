const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

const passport = require("passport");

/////////////////////////////////////// Blog API - Private ///////////////////////////////////////

/// AUTHENTICATION ROUTES ///

// POST - Log In
router.post("/login", userController.login);

/// USER ROUTES ///

// GET - User Detail
router.get("/user", passport.authenticate("jwt", { session: false }), userController.user_detail);

// POST - Edit User Detail
router.post("/user/edit", passport.authenticate("jwt", { session: false }), userController.user_edit);

/// POST ROUTES ///

// GET - Header
router.get("/header", postController.dashboardHeader);

// GET - Dashboard
router.get("/", passport.authenticate("jwt", { session: false }), postController.dashboard);

// POST - Publish Status
router.post("/post/:postid/publishStatus/:status", passport.authenticate("jwt", { session: false }), postController.publish_status);

// GET -  Post Detail
router.get("/post/:id", passport.authenticate("jwt", { session: false }), postController.post_detail);

// POST - Create/Update Post
router.post("/post/create", passport.authenticate("jwt", { session: false }), postController.create_post);

// POST - Delete Post
router.post("/post/:id/delete", passport.authenticate("jwt", { session: false }), postController.delete_post);

/// COMMENT ROUTES ///

// GET - Comment Detail
router.get("/post/:postid/comment/:commentid", passport.authenticate("jwt", { session: false }), commentController.comment_detail);

// POST - Create Comment
router.post("/post/:postid/comment/create", passport.authenticate("jwt", { session: false }), commentController.create_comment);

// POST - Delete Comment
router.post("/post/:postid/comment/:commentid/delete", passport.authenticate("jwt", { session: false }), commentController.delete_comment);

module.exports = router;