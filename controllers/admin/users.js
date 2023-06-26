const express = require('express');
const router = express.Router();
const Users = require('../../models/users')

router.get('/', (req, res) => {
    return Users.getUser((error, elems)=> {
        if (error) {
            return res.status(500).json({ code: 'UE', message: 'Unknown error'})
        }
        res.json(elems);
    });
});

router.post('/', function (req, res){
    const { user } = req.body;
    console.log('Controllers :: Admin :: PostUSER :: Data:', user);
    
    return Users.createUser(user, (error, b) => {
        if(error){
            console.log('Controllers :: Admin :: PostUSER :: Resultado: Error')
            return  res.status(500).json({ code: 'UE', message: 'Unkwown error'})
        }
        console.log('Controllers :: Admin :: PostUSER :: Resultado: Saved successfully!')
        res.json({ code: 'OK', message: 'Saved successfully!', data: b.toJSON()})
    });
});

router.post('/login', (req, res) => {

    console.log(req.body);
    const{user}=req.body;
    const { 
        email, 
        password
    } = user;

    console.log('Email:', email, 'Password:', password);

    Users.getUserByEmail(email, (error, user) => {
        if(error) {
            return  res.status(500).json({ code: 'UE' , message: 'Unknown Error!'})
        }
        console.log('Controllers :: Admin :: Login :: UserMongo:', user)
        if (user.password == password) {

            req.session.user = user.toJSON();

            return req.session.save(function (err) {
                if (err) return  res.status(500).json({ code: 'UE' , message: 'Unknown Error!'})
                console.log('Controllers :: Admin :: Login :: Success:', user)
                // return res.json({ code: 'OK', message: 'Login successful!'})
                res.json(user);
            });
        }
        
        return res.status(421).json({ code: 'PF' , message: 'Email or password is incorrect!'})
    });
});


module.exports = router;