const asyncHandler =require("express-async-handler");

// Comment Detail
exports.comment_detail = asyncHandler(async (req, res, next) => {
    res.status(200).json("Comment Detail - NOT IMPLEMENTED - " + req.params.postid + "/" + req.params.commentid);
});

// Comment Create POST
exports.comment_create_post = asyncHandler(async (req, res, next) => {
    res.status(200).json("Create Comment POST - NOT IMPLEMENTED");
});