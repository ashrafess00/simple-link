import mongoose from "mongoose";

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
    }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);