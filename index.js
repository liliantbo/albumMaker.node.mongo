const express = require("express");
const app=express();
const engine = require('ejs-locals');
const db = require('./db');

const session = require('express-session')
app.use(session({ 
    secret: 'Thisisthepassword', 
    resave: false,
    saveUninitialized: true
}))

const bodyParser = require('body-parser');
const path = require('path');

const port = 3000;
const AdminUsers = require('./controllers/admin/users')
const AdminAlbums = require('./controllers/admin/albums')
const ClientAlbums = require('./controllers/client/albums')

app.use(bodyParser.json({ type: 'application/json' }))

app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/users', AdminUsers)
app.use('/admins', AdminAlbums)
app.use('/clients', ClientAlbums)

app.use(express.static(path.join(__dirname, "build")));



app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}!`)
})