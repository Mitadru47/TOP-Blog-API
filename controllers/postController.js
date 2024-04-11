const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");

const Post = require("../models/post");
const Comment = require("../models/comment");

// Index Home Page
exports.index = (async (req, res, next) => {

    const [ author, posts ] = await Promise.all([
        
        User.find().exec(),
        Post.find().exec()
    ]);

    res.status(200).json({ author: author, posts: posts });
    // res.render("index", { author: author, posts: posts });
});

// Post Detail
exports.post_detail = asyncHandler(async(req, res, next) => {

    const [ author, posts, post, comments ] = await Promise.all([

        User.find().exec(),
        Post.find().exec(),

        Post.find({ _id: req.params.id }).exec(),
        Comment.find({ post: req.params.id }).exec()
    ]);

    res.render("post_detail", { author: author, posts: posts, post: post, comments: comments });
});