const Couriers = require('../schemas/couriers');

function getCourier(cb) {
    Couriers.find({})
    .then((elems) => {
        return cb(null, elems);
    })
    .catch((error) => {
        console.log('Error:', error);
        return cb(error);
    })
    exports.getCourier = getCourier;
}