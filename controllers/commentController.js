const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Comment = require("../models/comment");

// Comment Detail
exports.comment_detail = asyncHandler(async (req, res, next) => {

    const comment = await Comment.findById(req.params.commentid).populate("post").exec();
    res.status(200).json({ comment: comment });
});

//  Create Comment
exports.create_comment = [

    body("body", "Body cannot be empty!").trim().isLength({ min: 1 }).escape(),
    body("username", "Username cannot be empty!").trim().isLength({ min: 1 }).escape(),
    body("email", "Email cannot be empty!").trim().isLength({ min: 1 }).escape(),

    asyncHandler(async (req, res, next) => {
    
        const error = validationResult(req);
        const comment = new Comment({

            body: req.body.body,

            username: req.body.username,
            email: req.body.email,

            post: req.body.post,
            timestamp: new Date()
        });
        
        if(!error.isEmpty)
            res.status(400).json("DB Injection Failed!");
            
        else {
         
            await comment.save();
            res.status(200).json("Comment Added Successfully!");
        }
    })
];