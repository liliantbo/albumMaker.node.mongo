const express = require("express");
const app=express();
const engine = require('ejs-locals');
const bodyParser = require('body-parser');
const path = require('path');

const port = 3000;
const LandingPage = require('./controllers')

app.use(bodyParser.json({ type: 'application/json' }))

app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "build")));

app.use('/', LandingPage);

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}!`)
})