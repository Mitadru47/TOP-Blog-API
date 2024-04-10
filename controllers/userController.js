const asyncHandler = require("express-async-handler");

// User Detail
exports.user_detail = asyncHandler(async (req, res, next) => {
    res.send("User Detail - NOT IMPLEMENTED - " + req.params.id);
});