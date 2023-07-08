const express = require('express');
const router = express.Router();
const Albums = require('../../models/albums');

router.get('/', (req, res) => {
    return Albums.getAllAlbums((error, elems) => {
        if (error) {
            return res.status(500).json({ code: 'UE', message: 'Unknown error' })
        }
        res.json(elems);
    });
});

router.patch('/album', function (req, res) {
    const { albums } = req.body;
    if (!albums || albums.length === 0) {
        console.log('Controllers :: Admin :: PatchAlbum :: Debe indicar una lista de álbumes');
        return res.status(500).json({ code: 'UE', message: 'Unkwown error' });
    }
    updateAlbumList = albums.filter((album) => album.estado !== "DELETED");

    for (const album of updateAlbumList) {
        Albums.updateAlbum( album , (error, updatedAlbum) => {
            if (error) {
                console.log('Controllers :: Admin :: PostAlbum :: Error updating album:', album._id);
                return res.status(500).json({ code: 'UE', message: 'Unkwown error' })
            } else {
                console.log('Controllers :: Admin :: PostAlbum :: Albums updated');
            }
        });
    }
    res.json({ code: 'OK', message: 'Albums Saved successfully!' })

});

router.delete('/album/:id', function (req, res){
    // const { body: { data } } = res.body;
    const {id} = req.params;
    //console.log("request ", req)
    console.log('Controllers :: Admin :: DeleteAlbum :: ID:', id);
    
    Albums.deleteAlbumById(id, (error, b) => {
        if (error) {
            return  res.status(500).json({ code: 'UE', message: 'Unkwown error'})
        }
        res.json({ code: 'OK', message: 'Deleted successfully!', data: b.toJSON()})
    });
});

module.exports = router;