const mongoose = require('mongoose');

const users = mongoose.Schema({
    name: String,
    status:String
});

const Users = new mongoose.model('couriers', couriers);

module.exports = Users;