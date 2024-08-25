const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");

const Post = require("../models/post");
const Comment = require("../models/comment");

// Index Home Page
exports.index = asyncHandler(async (req, res, next) => {

    const [ author, posts ] = await Promise.all([
        
        User.find().exec(),
        Post.find({ publishStatus: true }).exec()
    ]);

    res.status(200).json({ author: author, posts: posts });
});

// Dashboard Home Page
exports.dashboard = asyncHandler(async (req, res, next) => {

    const posts = await Post.find().exec();
    res.status(200).json({ posts: posts });
});

// Post Detail
exports.post_detail = asyncHandler(async(req, res, next) => {

    const [ post, comments ] = await Promise.all([

        Post.find({ _id: req.params.id }).populate("author").exec(),
        Comment.find({ post: req.params.id }).exec()
    ]);

    res.status(200).json({ post: post, comments: comments });
});

// Post Publish Status

exports.publish_status = asyncHandler(async(req, res, next) => {

    if(req.params.status === "publish"){
        
        await Post.findByIdAndUpdate(req.params.postid, { publishStatus: true }).exec();
        res.status(200).json("Published!");    
    }

    if(req.params.status === "unpublish"){
        
        await Post.findByIdAndUpdate(req.params.postid, { publishStatus: false }).exec();
        res.status(200).json("Unpublished!");      
    }
});

// Create/Update Post

exports.create_post = [

    body("title", "Title cannot be empty").trim().isLength({ min: 1 }).escape(),
    body("body", "Body cannot be empty!").trim().isLength({ min: 1 }).escape(),

    body("author", "Author cannot be empty!").trim().isLength({ min: 1 }).escape(),

    asyncHandler(async (req, res, next) => {

        const error = validationResult(req);
        
        if(error.isEmpty){

            if(req.body.id){

                // Update Block

                const post = new Post({

                    title: req.body.title,
                    body: req.body.body,
        
                    timestamp: new Date(),
        
                    author: req.body.author,
                    publishStatus: false,

                    _id: req.body.id
                });
 
                await Post.findByIdAndUpdate(req.body.id, post);

                const referer = req.headers.referer.substring(0, req.headers.referer.length - 1); // http://localhost:5174       
                res.redirect(referer + "/dashboard" + post.url);
            }

            else{
                
                // Create Block

                const post = new Post({

                    title: req.body.title,
                    body: req.body.body,
        
                    timestamp: new Date(),
        
                    author: req.body.author,
                    publishStatus: false
                });

                await post.save();
            
                const referer = req.headers.referer.substring(0, req.headers.referer.length - 1); // http://localhost:5174       
                res.redirect(referer + "/dashboard" + post.url);
            }
        }

        else
            res.status(400).json("DB Injection Failed!");
    })
];