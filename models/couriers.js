const Couriers = require('../schemas/couriers');

function getCourier(cb) {
    Couriers.find({})
    .then((elems) => {
        return cb(null, elems);
    })
    .catch((error) => {
        console.log('Error retrieving all couriers:', error);
        return cb(error);
    })
    exports.getCourier = getCourier;
}
function getCourierByStatus(courierStatus, cb) {
    Couriers.find({ status: courierStatus })
      .then((elems) => {
        return cb(null, elems);
      })
      .catch((error) => {
        console.log('Error retrieving couriers by status', error);
        return cb(error);
      })
  }

  exports.getCourier = getCourier;
  exports.getCourierByStatus = getCourierByStatus;