const Users = require('../schemas/users');

function getUser(cb) {
    Users.find({})
    .then((elems) => {
        return cb(null, elems);
    })
    .catch((error) => {
        console.log('Error:', error);
        return cb(error);
    })
}

function getUserByEmail(emailValue, cb) {
    Users.findOne({ email: emailValue})
    .then((elem) => {
        return cb(null, elem);
    })
    .catch((error) => {
        console.log('Error:', error);
        return cb(error);
    })
}


function createUser(b, cb) {
    new Users(b)
    .save()
    .then((elem) => {
        return cb(null, elem);
    })
    .catch((error) => {
        console.log('Error:', error);
        return cb(error);
    });
}

function deleteUser(id, cb) {
    Users.findOneAndRemove({ _id: id})
    .then((elem) => {
        return cb(null, elem);
    })
    .catch((error) => {
        console.log('Error:', error);
        return cb(error);
    })
}

exports.getUser = getUser;
exports.getUserByEmail = getUserByEmail;
exports.createUser = createUser;
exports.deleteUser = deleteUser;