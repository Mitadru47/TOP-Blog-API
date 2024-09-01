const asyncHandler = require("express-async-handler");

const User = require("../models/user");
const { body, validationResult } = require("express-validator");

const passport = require("passport");

// Log In
exports.login = passport.authenticate("local", {
    failureRedirect: "http://localhost:5174/login", successRedirect: "http://localhost:5174/dashboard" });

// Log Out
exports.logout = asyncHandler(async (req, res, next) => {

    req.logOut();
    res.redirect("http://localhost:5174/login");
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