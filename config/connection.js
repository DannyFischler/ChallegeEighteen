const mongoose = require('mongoose');

const mongoDBURL = 'mongodb://localhost:27017/socialnetwork-api';
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(mongoDBURL, connectionOptions)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));

module.exports = mongoose.connection;
