const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { DateTime } = require("luxon");

const PostSchema = new Schema({

    title: { type: String, required: true },
    body: { type: String, required: true},

    timestamp: { type: Date, required: true }
});

PostSchema.virtual("url").get(function (){
    return "/index/post/" + this._id;
});

PostSchema.virtual("formattedTimestamp").get(function (){
    return DateTime.fromJSDate(this.timestamp).toISODate();
});

module.exports = mongoose.model("Post", PostSchema);