const asyncHandler = require("express-async-handler");

const User = require("../models/user");
const { body, validationResult } = require("express-validator");

const generateJWT = require("../utils/generateJWT");
const bcrypt = require("bcryptjs");

// Log In
exports.login = [
    
    body("username", "Username cannot be empty!").trim().isLength({ min: 1 }).escape(),
    body("password", "Password cannot be empty!").trim().isLength({ min: 1 }).escape(),
    
    asyncHandler(async (req, res, next) => {
 
        const error = validationResult(req);
        
        if(error.isEmpty()){

            const user = await User.findOne({ username: req.body.username }).exec();

            if(user){

                const match = await bcrypt.compare(req.body.password, user.password);

                if(match){
                
                    const tokenObject = generateJWT(user);
                    res.status(200).json({ success: true, token: tokenObject, expiresIn: tokenObject.expires });
                }

                else
                    res.status(401).json({ success: false, error: [{ msg: "Incorrect password, Please try again!" }] });
            }

            else
                res.status(401).json({ success: false, error: [{ msg: "Invalid username, Please try again!" }] });
        }

        else 
            res.status(500).json({ success: false, error: error.errors });
})];

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

            bcrypt.hash(req.body.password, 10, async (error, hashedPassword) => { 
                
                if(!error){

                    const user = new User({

                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
        
                        email: req.body.email,
        
                        username: req.body.username,
                        password: hashedPassword,
        
                        _id: req.body.id
                    });
        
                    await User.findByIdAndUpdate(req.body.id, user);
                    res.status(200).json({ status: "Success!" });
                }

                else
                    res.status(401).json({ status: "Failed!" });
            });
        }

        else
            res.status(400).json("DB Injection Failed!");
})];