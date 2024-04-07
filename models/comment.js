const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    username: { type: String, required: true },
    email: { type: String, required: true },

    body: { type: String, required: true },

    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    timestamp: { type: Date, required: true }
});

module.exports = mongoose.model("Comment", CommentSchema);