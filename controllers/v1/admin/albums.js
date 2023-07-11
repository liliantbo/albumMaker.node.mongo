const express = require('express');
const router = express.Router();
const Albums = require('../../../models/v1/albums');

//Api para obtener todos los albumes creados
router.get('/', (req, res) => {
    return Albums.getAllAlbums((error, elems) => {
        if (error) {
            return res.status(500).json({ code: 'UNKNOW_ERROR', message: 'Error inesperado. Intente mas tarde' })
        }
        res.status(200).json({ code: 'OK', message: 'Consulta exitosa', data: elems})
    });
});

//Api para la actualizacion de un album
router.patch('/album', function (req, res) {
    const { albums } = req.body;
    if (!albums || albums.length === 0) {
        console.log('Controllers :: Admin :: PatchAlbum :: Debe indicar una lista de álbumes');
        return res.status(500).json({ code: 'UNKNOW_ERROR', message: 'Error inesperado. Intente mas tarde' })
    }
    updateAlbumList = albums.filter((album) => album.estado !== "DELETED");
    for (const album of updateAlbumList) {
        Albums.updateAlbum(album, (error, updatedAlbum) => {
            if (error) {
                console.log('Controllers :: Admin :: PostAlbum :: Error updating album:', album._id);
                return res.status(500).json({ code: 'UNKNOW_ERROR', message: 'Error inesperado. Intente mas tarde' })
            } else {
                console.log('Controllers :: Admin :: PostAlbum :: Albums updated');
            }
        });
    }
    res.json({ code: 'OK', message: 'Albums Saved successfully!' })
});

//Api para la eliminacion de un album
router.delete('/album/:id', function (req, res) {
    const { id } = req.params;
    console.log('Controllers :: Admin :: DeleteAlbum :: ID:', id);
    Albums.deleteAlbumById(id, (error, b) => {
        if (error) {
            return res.status(500).json({ code: 'UNKNOW_ERROR', message: 'Error inesperado. Intente mas tarde' })
        }
        res.json({ code: 'OK', message: 'Eliminación exitosa', data: b.toJSON() })
    });
});

module.exports = router;