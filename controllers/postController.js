const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");
const Post = require("../models/post");

// Index Page
exports.index = (async (req, res) => {

    const [ author, posts ] = await Promise.all([
        
        User.find().exec(),
        Post.find().exec()
    ]);

    res.render("index", { author: author, posts: posts });
});