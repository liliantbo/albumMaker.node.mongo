const express = require("express");
const engine = require('ejs-locals');
const session = require('express-session')


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
const AdminUsers = require('./controllers/v1/admin/users')
const AdminAlbums = require('./controllers/v1/admin/albums')
const AdminCouriers = require('./controllers/v1/admin/couriers')
const ClientAlbums = require('./controllers/v1/client/albums')
const CourierAlbums = require('./controllers/v1/courier/albums')
const AuthCouriers = require('./middlewares/v1/authCouriers');
const RequireSession = require ('./middlewares/v1/requireSession')

app.use(bodyParser.json({ type: 'application/json' }))

app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/v1/users', AdminUsers)
app.use('/v1/couriers', AdminCouriers)
app.use('/v1/admin', AdminAlbums)
app.use('/v1/client', ClientAlbums)
app.use('/v1/courier',AuthCouriers,  CourierAlbums)

app.use(express.static(path.join(__dirname, "build")));

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}!`)
})