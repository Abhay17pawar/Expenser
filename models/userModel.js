const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    // uniqueId: {
    //     type: String,
    //     default: uuidv4, // Generate a unique ID for each user
    //     unique: true, // Ensure it's unique
    // },
    username: {
        type: String,
        required: [true, "Username is required!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    }
}, {
    timestamps: true
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
