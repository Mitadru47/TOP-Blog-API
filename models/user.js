const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true},

    email: { type: String },

    username: { type: String, required: true },
    password: { type: String, required: true }
});

UserSchema.virtual("url").get(function (){
    return "/user";
});

// To make sure virtual properties are usable in FE - React Components

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("User", UserSchema);