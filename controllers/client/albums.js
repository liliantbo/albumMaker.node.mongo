const express = require('express');
const router = express.Router();
const Albums = require('../models/albums');
const Album = require('../../schemas/albums');


router.get('/', (req, res) => {
    const {email} = req.session.user;

    return Albums.getAlbumsByUserEmail(email, (error, elems)=> {
        if (error) {
            return res.status(500).json({ code: 'UE', message: 'Unknown error'})
        }
        res.json(elems);
    });
});


router.post('/', function (req, res){
    const { album } = req.body;
    console.log('Controllers :: Client :: PostAlbum :: Data:', album);
    
    return Albums.createAlbum(album, (error, b) => {
        if(error){
            console.log('Controllers :: Client :: PostAlbum :: Resultado: Error')
            return  res.status(500).json({ code: 'UE', message: 'Unkwown error'})
        }
        console.log('Controllers :: Client :: PostAlbum :: Resultado: Saved successfully!')
        res.json({ code: 'OK', message: 'Saved successfully!', data: b.toJSON()})
    });
});

router.post('/:id', function (req, res){
    console.log('Deleting:', req.params);
    const { id } = req.params;
    const { album } = req.body;
    console.log('Controllers :: Client :: PostAlbum :: Data:', album);
    
    return Albums.updateAlbumById(id, (error, b) => {
        if(error){
            console.log('Controllers :: Client :: PostAlbum :: Resultado: Error')
            return  res.status(500).json({ code: 'UE', message: 'Unkwown error'})
        }
        console.log('Controllers :: Client :: PostAlbum :: Resultado: Saved successfully!')
        res.json({ code: 'OK', message: 'Saved successfully!', data: b.toJSON()})
    });
});



module.exports = router;