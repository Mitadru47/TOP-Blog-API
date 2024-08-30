const asyncHandler = require("express-async-handler");

const User = require("../models/user");
const { body, validationResult } = require("express-validator");

const passport = require("passport");

// Log In
exports.login = asyncHandler(async (req, res, next) => {

    passport.authenticate("login", asyncHandler(async (error, user, info) => {

        if(error)
            return res.status(500).json({ message: "Something went wrong!", error: (error || "Internal Server Error")});
        
        // req.login is provided by passport to serilize user id
        req.login(user, async (error) => {

            if(error)
                return res.status(500).json({ message: "Something went wrong!", error: (error || "Internal Server Error")});
        
            return res.send({ user, info });
        });

    }));

});

// Log In Check
exports.login_check = asyncHandler(async (req, res, next) => {
    
    if(!req.user)
        throw new Error("User not authenticated!");

    res.json(req.user);
});

// Log Out
exports.logout = asyncHandler(async (req, res, next) => {

    req.logout();
    res.json({ message: "Logged Out!" });
});

// User Detail
exports.user_detail = asyncHandler(async (req, res, next) => {

    const users = await User.find().exec();
    res.status(200).json(users);
});

// User Edit

exports.user_edit = [
    
    body("firstName", "FirstName cannot be empty!").trim().isLength({ min: 1 }).escape(),
    body("lastName", "LastName cannot be empty!").trim().isLength({ min: 1 }).escape(),
    body("email", "Email cannot be empty!").trim().isLength({ min: 1 }).escape(),
    body("username", "Username cannot be empty!").trim().isLength({ min: 1 }).escape(),
    body("password", "Password cannot be empty!").trim().isLength({ min: 1 }).escape(),
    
    asyncHandler(async (req, res, next) => {

        const error = validationResult(req);

        if(error.isEmpty){


            const user = new User({

                firstName: req.body.firstName,
                lastName: req.body.lastName,

                email: req.body.email,

                username: req.body.username,
                password: req.body.password,

                _id: req.body.id
            });

            await User.findByIdAndUpdate(req.body.id, user);

            const referer = req.headers.referer.substring(0, req.headers.referer.length - 1); // http://localhost:5174       
            res.redirect(referer + "/dashboard" + user.url);
        }

        else
            res.status(400).json("DB Injection Failed!");
})];