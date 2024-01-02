const router = require('express').Router();

const {
    fetchAllUsers,
    retrieveUserById,
    createNewUser,
    modifyUser,
    removeUser,
    addNewFriend,
    removeExistingFriend,
} = require('../../controllers/userController');

router.route('/')
    .get(fetchAllUsers)
    .post(createNewUser);

router.route('/:id')
    .get(retrieveUserById)
    .put(modifyUser)
    .delete(removeUser);

router.route('/:userId/friends/:friendId')
    .post(addNewFriend)
    .delete(removeExistingFriend);

module.exports = router;
