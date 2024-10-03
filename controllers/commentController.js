var he = require('he');

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
    body("email", "Invalid Email!").trim().isEmail().escape(),

    asyncHandler(async (req, res, next) => {
    
        const error = validationResult(req);

        if(error.isEmpty()){

            if(req.body.comment){

                const comment = new Comment({

                    post: req.body.post,
                    
                    username: he.decode(req.body.username),
                    email: req.body.email,
                    
                    body: he.decode(req.body.body),

                    timestamp: new Date(),
                    createdTimestamp: req.body.createdTimestamp,

                    _id: req.body.comment
                });
                  
                await Comment.findByIdAndUpdate(req.body.comment, comment);
                res.status(200).json({ status: "Success!" });
            }

            else{ 

                const comment = new Comment({

                    post: req.body.post,
                    
                    username: he.decode(req.body.username),
                    email: req.body.email,
                    
                    body: he.decode(req.body.body),

                    timestamp: new Date(),
                    createdTimestamp: new Date()
                });
                
                await comment.save();
                res.status(200).json({ status: "Success!" });
            }
        }

        else
            res.status(500).json({ status: "Failure!", error: error.errors });
    })
];

// Delete Comment
exports.delete_comment = asyncHandler(async (req, res, next) => {

    await Comment.findByIdAndDelete(req.params.commentid);
    res.status(200).json({ status: "Success!", id: req.params.postid });
});