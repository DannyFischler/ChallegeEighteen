const { User, Thought } = require("../models");

const userController = {
    fetchAllUsers(req, res) {
        User.find({})
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .sort({ _id: -1 })
            .then(users => res.json(users))
            .catch(error => {
                console.error(error);
                res.status(500).send('Error retrieving users');
            });
    },

    retrieveUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .then(user => {
                if (!user) {
                    return res.status(404).send('User not found');
                }
                res.json(user);
            })
            .catch(error => {
                console.error(error);
                res.status(400).send('Error finding user');
            });
    },

    createUser({ body }, res) {
        User.create(body)
            .then(newUser => res.json(newUser))
            .catch(error => res.status(400).json(error));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(updatedUser => {
                if (!updatedUser) {
                    return res.status(404).send('User not found');
                }
                res.json(updatedUser);
            })
            .catch(error => res.status(400).json(error));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(deletedUser => {
                if (!deletedUser) {
                    return res.status(404).send('User not found');
                }
                return Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
            })
            .then(() => res.send('User and associated thoughts successfully deleted'))
            .catch(error => res.status(400).json(error));
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(userWithNewFriend => {
                if (!userWithNewFriend) {
                    return res.status(404).send('User not found');
                }
                res.json(userWithNewFriend);
            })
            .catch(error => res.status(400).json(error));
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(userWithFriendRemoved => {
                if (!userWithFriendRemoved) {
                    return res.status(404).send('User not found');
                }
                res.json(userWithFriendRemoved);
            })
            .catch(error => res.status(400).json(error));
    }
};

module.exports = userController;
