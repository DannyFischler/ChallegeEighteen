const router = require('express').Router();
const userProfileRoutes = require('./userProfileRoutes');
const userThoughtRoutes = require('./userThoughtRoutes');

router.use('/users', userProfileRoutes);
router.use('/thoughts', userThoughtRoutes);

module.exports = router;
