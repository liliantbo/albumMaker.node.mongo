const express = require('express');
const router = express.Router();
const Albums = require('../models/albums')

router.get('/', (req, res) => {
    return Albums.getAllAlbums((error, elems)=> {
        if (error) {
            return res.status(500).json({ code: 'UE', message: 'Unknown error'})
        }
        res.json(elems);
    });
});

router.post('/:id', function (req, res){
    console.log('Deleting:', req.params);
    const { id } = req.params;
    const { album } = req.body;
    console.log('Controllers :: Admin :: PostAlbum :: Data:', album);
    
    return Albums.updateAlbumById(id, (error, b) => {
        if(error){
            console.log('Controllers :: Admin :: PostAlbum :: Resultado: Error')
            return  res.status(500).json({ code: 'UE', message: 'Unkwown error'})
        }
        console.log('Controllers :: Admin :: PostAlbum :: Resultado: Saved successfully!')
        res.json({ code: 'OK', message: 'Saved successfully!', data: b.toJSON()})
    });
});

module.exports = router;