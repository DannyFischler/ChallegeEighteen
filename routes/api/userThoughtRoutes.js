const router = require('express').Router();
const {
    fetchAllThoughts,
    createNewThought,
    modifyThought,
    removeThought,
    addThoughtReaction,
    removeThoughtReaction,
    retrieveThoughtById,
} = require('../../controllers/thoughtController');

router.route('/')
    .get(fetchAllThoughts)
    .post(createNewThought);

router.route('/:id')
    .get(retrieveThoughtById)
    .put(modifyThought)
    .delete(removeThought);

router.route('/:thoughtId/reactions')
    .post(addThoughtReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeThoughtReaction);

module.exports = router;
