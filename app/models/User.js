import { Schema, models } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema({
    name: {type: String,required: true,},
    email: {type: String, required: true,},
    password: {type: String, rquired: true},
}, {timestamps: true});

const User = models.User || mongoose.model("User", userSchema);
export default User;