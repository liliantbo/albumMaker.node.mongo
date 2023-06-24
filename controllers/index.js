const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('index', { name: 'Landing'});
});

module.exports = router;