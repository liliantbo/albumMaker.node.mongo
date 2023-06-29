const express = require('express');
const router = express.Router();
const Albums = require('../models/albums');
const Album = require('../../schemas/albums');


router.get('/', (req, res) => {
    const { email } = req.session.user;

    return Albums.getAlbumsByUserEmail(email, (error, elems) => {
        if (error) {
            return res.status(500).json({ code: 'UE', message: 'Unknown error' })
        }
        res.json(elems);
    });
});


router.post('/', function (req, res) {
    const { album } = req.body;
    console.log('Controllers :: Client :: PostAlbum :: Data:', album);

    const { billing, shipping, imageList, template } = album;
    const currentDate = format(new Date(), 'yyyyMMddHHmmss');

    const imageUrlList = imageList.filter((e) => e != null);

    const uploadPromises = imageUrlList.map((element) => {
        return uploadToS3(element.file, element.fileName)
            .then((uploadedUrl) => {
                return { S: uploadedUrl };
            })
            .catch((error) => {
                throw error;
            });
    });

    return Promise.all(uploadPromises)
        .then((uploadedResults) => {
            const uploadedUrls = uploadedResults.filter((result) => result !== null);

            if (uploadedUrls.length === 0) {
                return res.status(500).json({ code: 'UE', message: 'No se pudo cargar ninguna imagen en S3' });
            }
            album.imageUrlList = uploadedUrls;
            
            return Albums.createAlbum(album, (error, b) => {
                if (error) {
                    console.log('Controllers :: Client :: PostAlbum :: Resultado: Error')
                    return res.status(500).json({ code: 'UE', message: 'Unkwown error' })
                }
                console.log('Controllers :: Client :: PostAlbum :: Resultado: Saved successfully!')
                res.json({ code: 'OK', message: 'Saved successfully!', data: b.toJSON() })
            });

        })
        .catch((error) => {
            console.log('Error:', error);
            return res.status(500).json({ code: 'UE', message: 'Unkwown error' })
        });


});

router.post('/:id', function (req, res) {
    console.log('Deleting:', req.params);
    const { id } = req.params;
    const { album } = req.body;
    console.log('Controllers :: Client :: PostAlbum :: Data:', album);

    return Albums.updateAlbumById(id, (error, b) => {
        if (error) {
            console.log('Controllers :: Client :: PostAlbum :: Resultado: Error')
            return res.status(500).json({ code: 'UE', message: 'Unkwown error' })
        }
        console.log('Controllers :: Client :: PostAlbum :: Resultado: Saved successfully!')
        res.json({ code: 'OK', message: 'Saved successfully!', data: b.toJSON() })
    });
});



module.exports = router;