const asyncHandler = require("express-async-handler");

const User = require("../models/user");
const { body, validationResult } = require("express-validator");

const generateJWT = require("../utils/generateJWT");

// Log In
exports.login = asyncHandler(async (req, res, next) => {
 
    const user = await User.findOne({ username: req.body.username }).exec();

    if(user && user.password === req.body.password){

        const tokenObject = generateJWT(user);
        res.status(200).json({ success: true, token: tokenObject, expiresIn: tokenObject.expires });
    }

    else
        res.status(200).json({ success: false, message: "Login Failed!" });
});

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
            res.status(200).json({ status: "Success!" });
        }

        else
            res.status(400).json("DB Injection Failed!");
})];