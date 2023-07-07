const express = require("express");
const engine = require('ejs-locals');
const session = require('express-session')
const authCouriers = require('./middlewares/authCouriers');

const db = require('./db');

const app=express();

app.use(session({ 
    secret: 'Thisisthepassword', 
    resave: false,
    saveUninitialized: true
}))
app.use(express.json({ limit: '10mb' }));

const bodyParser = require('body-parser');
const path = require('path');

const port = 3000;
const AdminUsers = require('./controllers/admin/users')
const AdminAlbums = require('./controllers/admin/albums')
const AdminCouriers = require('./controllers/admin/couriers')
const ClientAlbums = require('./controllers/client/albums')
const CourierAlbums = require('./controllers/courier/albums')

app.use(bodyParser.json({ type: 'application/json' }))

app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/users', AdminUsers)
app.use('/couriers', AdminCouriers)
app.use('/admin', AdminAlbums)
app.use('/client', ClientAlbums)
app.use('/courier',authCouriers,  CourierAlbums)

app.use(express.static(path.join(__dirname, "build")));

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}!`)
})