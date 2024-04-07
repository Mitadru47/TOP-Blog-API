const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

/// POST ROUTES ///

router.get("/", postController.index);

/// COMMENT ROUTES ///



module.exports = router;