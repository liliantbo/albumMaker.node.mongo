const authCouriers = require('../../middlewares/authCouriers');
const express = require('express');
const router = express.Router();
const Albums = require('../../models/albums')

router.get('/', authCouriers, (req, res) => {
    const { name } = req.session.courier;
    console.log("Controller :: courier :: albums :: courierName: ", name);
    return Albums.getAlbumsByCourier(name, (error, elems)=> {
        if (error) {
            return res.status(500).json({ code: 'UE', message: 'Unknown error'})
        }
        console.log("Controller :: courier :: albums ", elems);
        res.json(elems);
    });
});


module.exports = router;