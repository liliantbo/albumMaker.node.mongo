
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
    const {albums} = req.body;
    const courier = req.session.courier;
    const updatedAlbums = [];
    const failedUpdates = [];

    console.log('Controllers :: Courier :: PostAlbum :: Data:', albums);

    if (!albums || albums.length === 0) {
        console.log('Controllers :: Courier :: PostAlbum :: Debe indicar una lista de álbumes');
        return res.status(500).json({ code: 'UE', message: 'Unkwown error' });
    }
    console.log("Controllers :: Courier :: PostAlbum :: Total de albumes a actuazar:", albums.length);

    albums.forEach((album, index) => {
        const albumId = album.albumId;
        const newStatus = album.estado;

        console.log("Controllers :: Courier :: PostAlbum :: album:", index, " estado: ", newStatus);
        if (!albumId) {
            console.log('Controllers :: Courier :: PostAlbum :: Debe indicar el ID del album');
            return;
        }

        Albums.getAlbumsById(albumId, (error, albumMongo) => {
            album=albumMongo.toJSON();
            if (error) {
                console.log('Controllers :: Courier :: PostAlbum :: Error retrieving album:', albumId);
                failedUpdates.push(albumId);
                return;
            }

            if (!album) {
                console.log('Controllers :: Courier :: PostAlbum :: Album not found:', albumId);
                failedUpdates.push(albumId);
                return;
            }

            if (courier && courier.name === album.courier) {
                const newAlbum = {
                    ...album,
                    estado: newStatus
                };

                console.log("Controllers :: Courier :: PostAlbum :: newAlbum:", newAlbum);

                Albums.updateAlbum(newAlbum, (error, updatedAlbum) => {
                    if (error) {
                        console.log('Controllers :: Courier :: PostAlbum :: Error updating album:', albumId);
                        failedUpdates.push(albumId);
                    } else {
                        console.log('Controllers :: Courier :: PostAlbum :: Album updated:', albumId);
                        updatedAlbums.push(albumId);
                    }

                    if (updatedAlbums.length + failedUpdates.length === albums.length) {
                        res.json({
                            updatedAlbums: updatedAlbums,
                            failedUpdates: failedUpdates
                        });
                    }
                });
            } else {
                console.log('Controllers :: Courier :: PostAlbum :: Invalid courier or album not assigned to courier:', albumId);
                failedUpdates.push(albumId);

                if (updatedAlbums.length + failedUpdates.length === albums.length) {
                    res.json({
                        updatedAlbums: updatedAlbums,
                        failedUpdates: failedUpdates
                    });
                }
            }
        });
    });
});



module.exports = router;