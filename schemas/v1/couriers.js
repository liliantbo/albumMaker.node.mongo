const mongoose = require('mongoose');

const couriers = mongoose.Schema({
    name: String,
    status:String,
    userName:String,
    password:String
});

const Couriers = new mongoose.model('couriers', couriers);

module.exports = Couriers;