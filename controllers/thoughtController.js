const { UserThought, UserProfile } = require("../models");

const thoughtController = {
    fetchAllThoughts(req, res) {
        UserThought.find({})
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .sort({ _id: -1 })
            .then(thoughts => res.json(thoughts))
            .catch(error => {
                console.error(error);
                res.status(500).send('Error retrieving thoughts');
            });
    },

    retrieveThoughtById({ params }, res) {
        UserThought.findOne({ _id: params.id })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(thought => {
                if (!thought) {
                    return res.status(404).send('Thought not found');
                }
                res.json(thought);
            })
            .catch(error => {
                console.error(error);
                res.status(400).send('Error finding thought');
            });
    },

   createNewThought({ body }, res) {
    UserThought.create(body)
        .then(({ _id }) => UserProfile.findOneAndUpdate(
            { userName: body.userName }, 
            { $push: { postedThoughts: _id } }, 
            { new: true }
        ))
        .then(userProfile => {
            if (!userProfile) {
                return res.status(404).send('User not found');
            }
            res.send('Thought successfully created');
        })
        .catch(error => res.status(400).send('Error creating thought'));
},


    modifyThought({ params, body }, res) {
        UserThought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(updatedThought => {
                if (!updatedThought) {
                    return res.status(404).send('Thought not found');
                }
                res.json(updatedThought);
            })
            .catch(error => res.status(400).send('Error updating thought'));
    },

    removeThought({ params }, res) {
        UserThought.findOneAndDelete({ _id: params.id })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).send('Thought not found');
                }
                return UserProfile.findOneAndUpdate(
                    { thoughts: params.id },
                    { $pull: { thoughts: params.id } },
                    { new: true }
                );
            })
            .then(updatedUser => {
                if (!updatedUser) {
                    return res.status(404).send('User not found');
                }
                res.send('Thought successfully deleted');
            })
            .catch(error => res.status(400).send('Error deleting thought'));
    },

    addThoughtReaction({ params, body }, res) {
        UserThought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(updatedThought => {
                if (!updatedThought) {
                    return res.status(404).send('Thought not found');
                }
                res.json(updatedThought);
            })
            .catch(error => res.status(400).send('Error adding reaction'));
    },

    removeThoughtReaction({ params }, res) {
        UserThought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(updatedThought => res.json(updatedThought))
            .catch(error => res.status(400).send('Error removing reaction'));
    }
};

module.exports = thoughtController;
