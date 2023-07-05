const express = require('express');
const router = express.Router();
const Albums = require('../../models/albums');

router.get('/', (req, res) => {
    return Albums.getAllAlbums((error, elems)=> {
        if (error) {
            return res.status(500).json({ code: 'UE', message: 'Unknown error'})
        }
        res.json(elems);
    });
});

router.post('/album', function (req, res) {
    const { albums } = req.body;
    console.log('Controllers :: Admin :: PostAlbum :: Data:', albums);

    if (!albums || albums.length === 0) {
        console.log('Controllers :: Admin :: PostAlbum :: Debe indicar una lista de álbumes');
        return res.status(500).json({ code: 'UE', message: 'Unkwown error' });
    }
    deleteAlbumList=albums.filter((album)=>album.estado==="DELETED");
    updateAlbumList=albums.filter((album)=>album.estado!=="DELETED");
    Albums.deleteAlbumList({albums:deleteAlbumList}, (error, updatedAlbum) => {
        if (error) {
            console.log('Controllers :: Admin :: PostAlbum :: Error updating album:');
            return res.status(500).json({ code: 'UE', message: 'Unkwown error' })
        } else {
            console.log('Controllers :: Admin :: PostAlbum :: Album deleted:');
            //res.json({ code: 'OK', message: 'Saved successfully!', data: deletedAlbum })
        }
    });
    Albums.updateAlbumList({albums:updateAlbumList}, (error, updatedAlbum) => {
        if (error) {
            console.log('Controllers :: Admin :: PostAlbum :: Error updating album:');
            return res.status(500).json({ code: 'UE', message: 'Unkwown error' })
        } else {
            console.log('Controllers :: Admin :: PostAlbum :: Album updated:');
            res.json({ code: 'OK', message: 'Saved successfully!', data: updatedAlbum })
        }
    });
});

router.delete('/album', function (req, res) {
    const { albumId } = req.body.album;
    return Albums.deleteAlbumById(albumId, (error, elems)=> {
        if (error) {
            return res.status(500).json({ code: 'UE', message: 'Unknown error'})
        }
        res.json(elems);
    });
})

module.exports = router;