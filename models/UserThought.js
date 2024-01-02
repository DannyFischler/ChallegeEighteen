const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./UserReaction'); 
const dateFormat = require('../utils/dateFormat');
const UserReactionSchema = require('./UserReaction');

const UserThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'You need to leave a thought!',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtValue => dateFormat(createdAtValue)
        },
        userName: {
            type: String,
            required: true
        },
        reactions: [UserReactionSchema] 
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);


const UserThought = model('UserThought', UserThoughtSchema);

module.exports = UserThought;
