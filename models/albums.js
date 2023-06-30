const Albums = require('../schemas/albums');

function createAlbum(albumData, cb) {
  new Albums(albumData)
  .save()
  .then((elem) => {
      return cb(null, elem);
  })
  .catch((error) => {
      console.log('Error creating album:', error);
      return cb(error);
  });
}

function getAllAlbums(cb){
     Albums.find({})
    .then((elems) => {
        return cb(null, elems);
    })
    .catch((error) => {
        console.log('Error retrieving albums', error);
        return cb(error);
    })
};

function getAlbumsByUserEmail(emailValue, cb) {
  Albums.find({ userEmail: emailValue})
  .then((elems) => {
    return cb(null, elems);
  })
  .catch((error) => {
      console.log('Error retrieving user albums', error);
      return cb(error);
  })
}


// UPDATE
const updateAlbumById = (albumId, updateData) => {
  return Albums.findByIdAndUpdate(albumId, updateData, { new: true })
    .then(updatedAlbum => updatedAlbum)
    .catch(() => {
      throw new Error('Error updating album');
    });
};

// DELETE
const deleteAlbumById = (albumId) => {
  return Albums.findByIdAndRemove(albumId)
    .then(() => true)
    .catch(() => {
      throw new Error('Error deleting album');
    });
};

exports.createAlbum = createAlbum;
exports.getAllAlbums = getAllAlbums;
exports.getAlbumsByUserEmail = getAlbumsByUserEmail;
exports.updateAlbumById = updateAlbumById;
exports.deleteAlbumById = deleteAlbumById;