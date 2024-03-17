import mongoose from "mongoose";

const urls = new mongoose.Schema({
    name: String,
    url: String
})

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "please provice an Email"],
        unique: [true, "Email Exist"],
    },
    password: {
        type: String,
        required: [true, "please type password"],
        unique: false,
    },
    userUrls: [urls],
    avatar: { type: String },
    firstName: String,
    lastName: String,
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);