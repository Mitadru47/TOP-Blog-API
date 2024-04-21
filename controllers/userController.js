const asyncHandler = require("express-async-handler");

const User = require("../models/user");

// User Detail
exports.user_detail = asyncHandler(async (req, res, next) => {

    const users = await User.find().exec();
    res.status(200).json(users);
});