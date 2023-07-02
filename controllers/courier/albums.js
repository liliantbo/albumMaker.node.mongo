
const express = require('express');
const router = express.Router();
const Albums = require('../../models/albums')

router.get('/', (req, res) => {
    const { name } = req.session.courier;
    console.log("Controller :: courier :: albums :: courierName: ", name);
    return Albums.getAlbumsByCourier(name, (error, elems) => {
        if (error) {
            return res.status(500).json({ code: 'UE', message: 'Unknown error' })
        }
        console.log("Controller :: courier :: albums ", elems);
        res.json(elems);
    });
});

router.post('/album', function (req, res) {
    const { albums } = req.body;
    const { name } = req.session.courier;
    console.log("Controller :: courier :: albums :: courierName: ", name);
    console.log('Controllers :: Courier :: PostAlbum :: Data:', albums);

    if (!albums || albums.length === 0) {
        console.log('Controllers :: Courier :: PostAlbum :: Debe indicar una lista de álbumes');
        return res.status(500).json({ code: 'UE', message: 'Unkwown error' });
    }
    Albums.updateAlbumList({albums:albums,courierName:name }, (error, updatedAlbum) => {
        if (error) {
            console.log('Controllers :: Courier :: PostAlbum :: Error updating album:');
            return res.status(500).json({ code: 'UE', message: 'Unkwown error' })
        } else {
            console.log('Controllers :: Courier :: PostAlbum :: Album updated:');
            res.json({ code: 'OK', message: 'Saved successfully!', data: updatedAlbum })
        }
    });
});

module.exports = router;