const express = require('express');
const router = express.Router();
const Couriers = require('../../../models/v1/couriers')
const nodecache = require('node-cache');
const cache = new nodecache({stdTTL: 60})

//Api para obtener listado de couriers
router.get('/', (req, res) => {
    const key = 'courierNameList';
    let courierNameList = null;
    if (cache.has(key)) {
        courierNameList=cache.get(key);
        console.log("Contorllers :: Admin :: Couriers :: Cache: ",courierNameList)
        res.status(200).json({ code: 'OK', message: 'Consulta exitosa', data: courierNameList})
    } else {
        return Couriers.getCourierByStatus("ACTIVO", (error, elems) => {
            if (error) {
                res.status(500).json({ code: 'UNKNOW_ERROR', message: 'Error inesperado. Intente mas tarde' })
            }
            console.log("Contorllers :: Admin :: Couriers :: Mongo: ",elems);
            cache.set( key, elems)
            res.status(200).json({ code: 'OK', message: 'Consulta exitosa', data: elems})
        });
    }
});

module.exports = router;