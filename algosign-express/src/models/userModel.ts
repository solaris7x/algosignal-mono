import mongoose, { Schema } from "mongoose";

const UserModelSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
});

const UserModel = mongoose.model("Users", UserModelSchema);
export default UserModel;
