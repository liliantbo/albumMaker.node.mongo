const express = require('express');
const router = express.Router();
const Albums = require('../../../models/v1/albums');
const uploadToS3 = require('../../../models/v1/images');

router.get('/', (req, res) => {
    if (!req.session.user){
        return res.status(401).json({ code: 'NOT_AUTHORIZED', message: 'No ha iniciado sesión' });
    }
    const { email } = req.session.user;
    console.log('Controllers :: Client :: getAlbums :: email:', email);
    return Albums.getAlbumsByUserEmail(email, (error, albums) => {
        if (error) {
            return res.status(500).json({ code: 'UNKNOW_ERROR', message: 'Error inesperado. Intente mas tarde' })
        }
        console.log('Controllers :: Client :: getAlbums :: response:', albums);
        res.status(200).json({ code: 'OK', message: 'Consulta exitosa', data: albums})
    });
});

router.post('/album', function (req, res) {
    const { newAlbum } = req.body;
    const { imageListNew, imageUrlList } = newAlbum;
    console.log('Controllers :: Client :: PostAlbum :: Guardando en S3: ', newAlbum);
    console.log("imageListNew ", newAlbum.imageListNew);
    imageListNew && imageListNew.length>0 && 
    uploadToS3({ imageListNew:imageListNew , imageUrlList:imageUrlList }, (error, imageUrlListNew) => {
        if (error) {
            console.log('Controllers :: Client :: PostAlbum :: saveImageToS3 :: Resultado: Error')
            return res.status(500).json({ code: 'UNKNOW_ERROR', message: 'Error inesperado. Intente mas tarde' })
        }
        newAlbum.imageUrlList = [...imageUrlListNew];
        console.log('Controllers :: Client :: PostAlbum :: imageUrlList:', imageUrlList);

    });
    console.log('Controllers :: Client :: PostAlbum :: Guardando en Mongo: ', newAlbum);
    console.log('Controllers :: Client :: PostAlbum :: guardar/actualizar :', newAlbum._id)
    if (!newAlbum._id) {
        return Albums.createAlbum(newAlbum, (error, b) => {
            if (error) {
                console.log('Controllers :: Client :: PostAlbum :: SAVE :: Resultado: Error')
                return res.status(500).json({ code: 'UNKNOW_ERROR', message: 'Error inesperado. Intente mas tarde' })
            }
            console.log('Controllers :: Client :: PostAlbum :: SAVE :: Resultado: Saved successfully!')
            res.status(200).json({ code: 'OK', message: 'Album creado exitosamente!', data: b.toJSON() })
        });
    }
    return res.status(500).json({ code: 'UNKNOW_ERROR', message: 'Error inesperado. Intente mas tarde' })
})

router.patch('/album', function (req, res) {
    const { newAlbum } = req.body;
    const { imageListNew, imageUrlList } = newAlbum;
    console.log('Controllers :: Client :: PostAlbum :: Guardando en S3: ', newAlbum);
    console.log("imageListNew ", newAlbum.imageListNew);
    imageListNew && imageListNew.length>0 && 
    uploadToS3({ imageListNew:imageListNew , imageUrlList:imageUrlList }, (error, imageUrlListNew) => {
        if (error) {
            console.log('Controllers :: Client :: PostAlbum :: saveImageToS3 :: Resultado: Error')
            return res.status(500).json({ code: 'UNKNOW_ERROR', message: 'Error inesperado. Intente mas tarde' })
        }
        newAlbum.imageUrlList = [...imageUrlListNew];
        console.log('Controllers :: Client :: PostAlbum :: imageUrlList:', imageUrlList);

    });
    console.log('Controllers :: Client :: PostAlbum :: Guardando en Mongo: ', newAlbum);
    console.log('Controllers :: Client :: PostAlbum :: guardar/actualizar :', newAlbum._id)
    if (newAlbum._id) {
        return Albums.updateAlbum(newAlbum, (error, b) => {
            if (error) {
                console.log('Controllers :: Client :: PostAlbum :: UPDATE :: Resultado: Error')
                return res.status(500).json({ code: 'UNKNOW_ERROR', message: 'Error inesperado. Intente mas tarde' })
            }
            console.log('Controllers :: Client :: PostAlbum :: UPDATE :: Resultado: Update successfully!')
            res.status(200).json({ code: 'OK', message: 'Album actualizado exitosamente', data: b.toJSON() })
        });
    }
    return res.status(500).json({ code: 'UNKNOW_ERROR', message: 'Error inesperado. Intente mas tarde' })
})

module.exports = router;