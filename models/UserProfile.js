const { Schema, model } = require("mongoose");

const UserProfileSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Username is required"],
        },
        emailAddress: {
            type: String,
            unique: true,
            required: [true, "Email address is required"],
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please provide a valid email address"
            ],
        },
        postedThoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "UserThought",
            },
        ],
        userFriends: [
            {
                type: Schema.Types.ObjectId,
                ref: "UserProfile",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

const UserProfile = model("UserProfile", UserProfileSchema);

module.exports = UserProfile;
