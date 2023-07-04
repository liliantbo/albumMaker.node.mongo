const express = require('express');
const router = express.Router();
const Albums = require('../../models/albums');
const Images = require('../../models/images');

router.get('/', (req, res) => {
    const { email } = req.session.user;
    console.log('Controllers :: Client :: getAlbums :: email:', email);
    return Albums.getAlbumsByUserEmail(email, (error, elems) => {
        if (error) {
            return res.status(500).json({ code: 'UE', message: 'Unknown error' })
        }
        console.log('Controllers :: Client :: getAlbums :: response:', elems);
        res.json(elems);
    });
});

router.post('/album', function (req, res) {
    const { newAlbum } = req.body;
    const { imageListToS3, imageUrlList } = newAlbum;

    Images.uploadToS3(imageListToS3, imageUrlList, (error, imageUrlListNew) => {
        if (error) {
            console.log('Controllers :: Client :: PostAlbum :: saveImageToS3 :: Resultado: Error')
            return res.status(500).json({ code: 'UE', message: 'Unkwown error' })
        }
        newAlbum.imageUrlList = imageUrlListNew;
        console.log('Controllers :: Client :: PostAlbum :: Data:', newAlbum);

        if (!newAlbum._id) {
            return Albums.createAlbum(newAlbum, (error, b) => {
                if (error) {
                    console.log('Controllers :: Client :: PostAlbum :: SAVE :: Resultado: Error')
                    return res.status(500).json({ code: 'UE', message: 'Unkwown error' })
                }
                console.log('Controllers :: Client :: PostAlbum :: SAVE :: Resultado: Saved successfully!')
                res.json({ code: 'OK', message: 'Saved successfully!', data: b.toJSON() })
            });
        }
        return Albums.updateAlbum(newAlbum, (error, b) => {
            if (error) {
                console.log('Controllers :: Client :: PostAlbum :: UPDATE :: Resultado: Error')
                return res.status(500).json({ code: 'UE', message: 'Unkwown error' })
            }
            console.log('Controllers :: Client :: PostAlbum :: SAVE :: Resultado: Saved successfully!')
            res.json({ code: 'OK', message: 'Update successfully!', data: b.toJSON() })
        });

    })

});

module.exports = router;