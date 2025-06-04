import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "user",
        enum: ["user","moderator","admin"],
    },
    skills: [String],
    createdAT: {
        type: Date,
        default: Date.now
    }

});

export default mongoose.model("User",userSchema )