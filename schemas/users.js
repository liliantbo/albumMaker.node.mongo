const mongoose = require('mongoose');

const users = mongoose.Schema({
    first_name: String,
    last_name: String,
    username: String,
    email: String,
    password: String
});

const Users = new mongoose.model('user', users);

module.exports = Users;