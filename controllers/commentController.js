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

        if(error.isEmpty){

            if(req.body.comment){

                const comment = new Comment({

                    body: req.body.body,

                    username: req.body.username,
                    email: req.body.email,

                    post: req.body.post,
                    timestamp: new Date(),

                    _id: req.body.comment
                });
                  
                await Comment.findByIdAndUpdate(req.body.comment, comment);

                const referer = req.headers.referer.substring(0, req.headers.referer.length - 1);
                res.redirect(referer + "/dashboard" + comment.url);  
            }

            else{ 

                const comment = new Comment({

                    body: req.body.body,

                    username: req.body.username,
                    email: req.body.email,

                    post: req.body.post,
                    timestamp: new Date()
                });
                
                await comment.save();
                res.status(200).json("Comment Added Successfully!");
            }
        }

        else
            res.status(400).json("DB Injection Failed!");
    })
];

// Delete Comment
exports.delete_comment = asyncHandler(async (req, res, next) => {

    await Comment.findByIdAndDelete(req.params.commentid);

    const referer = req.headers.referer.substring(0, req.headers.referer.length - 1);
    res.redirect(referer + "/dashboard/post/" + req.params.postid);  
});