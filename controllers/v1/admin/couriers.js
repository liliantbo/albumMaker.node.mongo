const express = require('express');
const router = express.Router();
const Couriers = require('../../../models/v1/couriers')
const nodecache = require('node-cache');
const cache = new nodecache({stdTTL: 60})

router.get('/', (req, res) => {
    const key = 'courierNameList';
    let courierNameList = null;
    if (cache.has(key)) {
        courierNameList=cache.get(key);
        console.log("Contorllers :: Admin :: Couriers :: Cache: ",courierNameList)
        res.json(courierNameList)
    } else {
        return Couriers.getCourierByStatus("ACTIVO", (error, elems) => {
            if (error) {
                return res.status(500).json({ code: 'UE', message: 'Unknown error' })
            }
            console.log("Contorllers :: Admin :: Couriers :: Mongo: ",elems);
            cache.set( key, elems)
            res.json(elems);
        });
    }
});

module.exports = router;