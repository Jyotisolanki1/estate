import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar:{
        type:String,
        default: "https://cdn.vectorstock.com/i/preview-lt/15/40/blank-profile-picture-image-holder-with-a-crown-vector-42411540.webp"
    }
},
{timestamps: true}
)

const User =  mongoose.model("User" , userSchema);
export default User;