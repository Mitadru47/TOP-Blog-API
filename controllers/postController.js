const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");
const Post = require("../models/post");

// Index Home Page
exports.index = (async (req, res, next) => {

    const [ author, posts ] = await Promise.all([
        
        User.find().exec(),
        Post.find().exec()
    ]);

    res.render("index", { author: author, posts: posts });
});

// Post Detail
exports.post_detail = asyncHandler(async(req, res, next) => {
    res.send("Post Detail - NOT IMPLEMENTED - " + req.params.id);
});