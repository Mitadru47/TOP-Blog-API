const asyncHandler = require("express-async-handler");

const Comment = require("../models/comment");

// Comment Detail
exports.comment_detail = asyncHandler(async (req, res, next) => {

    const comment = await Comment.findById(req.params.commentid).populate("post").exec();
    res.status(200).json({ comment: comment });
});

// Comment Create POST
exports.comment_create_post = asyncHandler(async (req, res, next) => {
    res.status(200).json("Create Comment POST - NOT IMPLEMENTED");
});