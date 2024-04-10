const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Post = require("../models/post");

// Index Page
exports.index = (async (req, res) => {

    const posts = await Post.find().exec();
    res.render("index", { posts: posts });
});