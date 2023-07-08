const express = require('express');
const router = express.Router();
const Users = require('../../models/users')

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
    console.log('Controllers :: Admin :: Login :: INICIO')
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

router.post('/logout', (req, res) => {
    console.log('Controllers :: Admin :: Logout :: INICIO');
    console.log(req.body);
    const { user } = req.body;
    
    console.log('Controllers :: Admin :: Logout :: User:', user);
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al destruir la sesión:', err);
        return res.status(500).json({ code: 'ERROR', message: 'Failed to logout!' });
      }
      console.log('Controllers :: Admin :: Logout :: Exito:'); 
      return res.status(200).json({ code: 'OK', message: 'Success to logout!' });
      //res.redirect('http://localhost:3000/');    
    });
  });

  module.exports = router;