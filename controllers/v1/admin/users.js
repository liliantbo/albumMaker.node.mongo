const express = require('express');
const router = express.Router();
const Users = require('../../../models/v1/users')

router.post('/', function (req, res){
    const { user } = req.body;
    return Users.createUser(user, (error, newUser) => {
        if(error){
            console.log('Controllers :: Admin :: PostUSER :: Resultado: Error')
            return  res.status(500).json({ code: 'UNKNOW_ERROR', message: 'Error inesperado. Intente mas tarde'})
        }
        console.log('Controllers :: Admin :: PostUSER :: Resultado: Registro exitoso:', newUser)
        res.status(200).json({ code: 'OK', message: 'Registro exitoso', data: newUser.toJSON()})
    });
});

router.post('/login', (req, res) => {
    console.log(req.body);
    const{user}=req.body;
    const { 
        email, 
        password
    } = user;
    Users.getUserByEmail(email, (error, user) => {
        if(error) {
            return res.status(500).json({ code: 'UNKNOW_ERROR', message: 'Error inesperado. Intente mas tarde' })
        }
        if (user.password == password) {
            req.session.user = user.toJSON();
            return req.session.save(function (err) {
                if (err) return  res.status(500).json({ code: 'UE' , message: 'Unknown Error!'})
                console.log('Controllers :: Admin :: Login :: Exitoso:', user)
                res.status(200).json({ code: 'OK', message: 'Login Exitoso', data: user.toJSON() })
            });
        }
        return res.status(401).json({ code: 'INVALID_CREDENTIALS' , message: 'Credenciales incorrectas'})
    });
});

router.post('/logout', (req, res) => {
    console.log(req.body);
    const { user } = req.body;
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al destruir la sesión:', err);
        return res.status(500).json({ code: 'SESSION_DESTROY_ERROR', message: 'Error inesperado al intentar cerrar la sesion' });
      }
      console.log('Controllers :: Admin :: Logout :: Exito:'); 
      return res.status(200).json({ code: 'OK', message: 'Logout exitoso, te esperamos pronto' });
    });
  });

  module.exports = router;