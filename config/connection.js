const mongoose = require('mongoose');

const mongoDBURL = 'mongodb://127.0.0.1:27017/socialnetwork-api';


mongoose.connect(mongoDBURL)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));

module.exports = mongoose.connection;
