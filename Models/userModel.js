import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        firstname:{
            type: String,
            required: true
        },
        lastname:{
            type: String,
            required: true
        },
        isAdmin:{
            type: Boolean,
            default: false,
        },
        profilePicture: String,
        coverPicture: String,
        about: String,
        bio: String,
        location: String, 
        motherAgent: String,
        height: String,
        eyes: String, 
        hair: String, 
        waist: String,
        shoes: String,
        // TODO: add rest of the about info
        followers:[],
        following:[],
        portfolio: [],
        groups: []
    },
    {timestamps: true}
)

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;