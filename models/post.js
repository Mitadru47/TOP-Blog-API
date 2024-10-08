const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { DateTime } = require("luxon");

const PostSchema = new Schema({

    title: { type: String, required: true },
    body: { type: String, required: true},

    timestamp: { type: Date, required: true },
    createdTimestamp: { type: Date, required: true },
    
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    publishStatus: { type: Boolean, required: true }
});

PostSchema.virtual("url").get(function (){
    return "/post/" + this._id;
});

PostSchema.virtual("formattedTimestamp").get(function (){
    return DateTime.fromJSDate(this.timestamp).toISODate();
});

PostSchema.virtual("formattedCreatedTimestamp").get(function (){
    return DateTime.fromJSDate(this.createdTimestamp).toISODate();
});

// To make sure virtual properties are usable in FE - React Components

PostSchema.set('toObject', { virtuals: true });
PostSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Post", PostSchema);