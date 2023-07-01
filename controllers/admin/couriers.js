const express = require('express');
const router = express.Router();
const Couriers = require('../../models/couriers')

router.get('/', (req, res) => {
    const courierNameList = req.session.courierNameList;
    if (courierNameList) {
        console.log("Contorllers :: Admin :: Couriers :: Session: ",courierNameList)
        res.json(courierNameList)
    } else {
        return Couriers.getCourierByStatus("ACTIVO", (error, elems) => {
            if (error) {
                return res.status(500).json({ code: 'UE', message: 'Unknown error' })
            }
            console.log("Contorllers :: Admin :: Couriers :: Mongo: ",elems);
            req.session.courierNameList = elems;
            res.json(elems);
        });
    }
});

module.exports = router;