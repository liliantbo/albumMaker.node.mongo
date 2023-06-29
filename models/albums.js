const Albums = require('../schemas/albums');

// CREATE
const createAlbum = (albumData) => {
  const album = new Albums(albumData);
  return album.save()
    .then(createdAlbum => createdAlbum)
    .catch(() => {
      throw new Error('Error creating album');
    });
};

// READ
const getAlbumById = (albumId) => {
  return Albums.findById(albumId)
    .then(album => album)
    .catch(() => {
      throw new Error('Error retrieving album');
    });
};

const getAllAlbums = (cb) => {
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
exports.getAlbumById = getAlbumById;
exports.getAllAlbums = getAllAlbums;
exports.getAlbumsByUserEmail = getAlbumsByUserEmail;
exports.updateAlbumById = updateAlbumById;
exports.deleteAlbumById = deleteAlbumById;