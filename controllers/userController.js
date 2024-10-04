const he = require('he');
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

            const user = await User.findOne({ username: he.decode(req.body.username) }).exec();

            if(user){

                const match = await bcrypt.compare(he.decode(req.body.password), user.password);

                if(match){
                
                    const tokenObject = generateJWT(user);
                    res.status(200).json({ status: "Success!", token: tokenObject, expiresIn: tokenObject.expires });
                }

                else
                    res.status(401).json({ status: "Failure!", error: [{ msg: "Incorrect password, Please try again!" }] });
            }

            else
                res.status(401).json({ status: "Failure!", error: [{ msg: "Invalid username, Please try again!" }] });
        }

        else 
            res.status(500).json({ status: "Failure!", error: error.errors });
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
    body("email", "Invalid Email!").trim().isEmail().escape(),

    body("username", "Username cannot be empty!").trim().isLength({ min: 1 }).escape(),
    body("password", "Password cannot be empty!").trim().isLength({ min: 1 }).escape(),
    
    asyncHandler(async (req, res, next) => {

        const error = validationResult(req);

        if(error.isEmpty()){

            const originalUser = await User.find().exec();
            
            bcrypt.compare(req.body.password, originalUser[0].password, async function (err, result) {

                if(err)
                    res.status(500).json({ status: "Failure!", error: [{ msg: "Bcrypt Error!" }] });

                if(result){                    

                    const user = new User({

                        firstName: he.decode(req.body.firstName),
                        lastName: he.decode(req.body.lastName),
        
                        email: req.body.email,
        
                        username: he.decode(req.body.username),
                        password: originalUser[0].password,
        
                        _id: req.body.id
                    });
        
                    await User.findByIdAndUpdate(req.body.id, user);
                    res.status(200).json({ status: "Success!" });
                }

                else
                    res.status(401).json({ status: "Failure!", error: [{ msg: "Incorrect password, Please try again!" }] }); 
            });
        }

        else
            res.status(500).json({ status: "Failure!", error: error.errors });
})];