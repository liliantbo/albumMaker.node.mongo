const mongoose = require('mongoose');

const USER = 'liliantbo';
const PASSWORD = 'D2IxJh3nlh55ZQNT';
const DATABASE_NAME = 'AlbumMakerDB';


const URL = `mongodb+srv://${USER}:${PASSWORD}@cluster0.2ds9nhy.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose.connect(URL)
.then(() => {
    console.log('Database connected!');
})
.catch((error)=> {
    console.log('Error connecting:', error);
});