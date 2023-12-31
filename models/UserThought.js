const { Schema, model, Types } = require("mongoose");
const formatDate = require("../utils/dateFormat");

const UserReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        createdBy: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => formatDate(createdAtValue),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const UserThoughtSchema = new Schema(
    {
        thoughtMessage: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => formatDate(createdAtValue),
        },
        postedBy: {
            type: String,
            required: true,
        },
        userReactions: [UserReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

UserThoughtSchema.virtual("reactionCount").get(function() {
    return this.userReactions.length;
});

const Thought = model("UserThought", UserThoughtSchema);

module.exports = Thought;
