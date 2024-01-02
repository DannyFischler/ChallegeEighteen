const { Schema, Types } = require("mongoose");
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

module.exports = UserReactionSchema;
