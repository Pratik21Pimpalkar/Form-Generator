import mongoose from "mongoose";
const { Schema } = mongoose
const UserSchema = Schema({
    name: {
        required: true,
        unique: true,
        type: String,
        trim: true,
    },
    password: {
        required: true,
        type: String,
        trim: true,
    },
    cpassword: {
        required: true,
        type: String,
        trim: true,
    },
}
)

const User = mongoose.model("User", UserSchema);
export default User;