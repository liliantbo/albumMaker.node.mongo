import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { login } from '../reducers/authActions';
import { Alert } from 'react-bootstrap';

import DemoImage from '../AlbumMakerDemo.gif'
import Modal from '../commonComponents/Modal'
import AddUserForm from './AddUserForm';
import LoginForm from './LoginForm'
import axios from "axios";
import '../App.css';

export default function Login() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  //redux reducer
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const [addModal, setAddModal] = useState(false);
  const toggleShowAddModal = () => setAddModal(!addModal);
  const [loginModal, setLoginModal] = useState(false);
  const toggleShowLoginModal = () => setLoginModal(!loginModal);


  const addUser = (user) => {
    user.id = users.length + 1;
    user.image = "https://randomuser.me/api/portraits/thumb/lego/1.jpg";
    toggleShowAddModal();

    axios
      .post("http://localhost:3000/users", { user })
      .then((response) => {
        console.log('Data:', response)
        setSuccess("¡Registro exitoso! 🎉 Por favor, inicia sesión para comenzar a dar vida a tus álbumes en Album Maker. ✨");
        setUsers([user, ...users]);
      });
  };

  const loginUser = (user) => {
    toggleShowLoginModal();
    axios
      .post("http://localhost:3000/users/login", { user })
      .then((response) => {
        dispatch(login(response.data));
        console.log('Data:', response.data)
      }).catch((error) => {
        console.error('Error:', error);
        setError("Usuario o password incorrectos");
      });
  };

  return (
      <main className="d-flex flex-column ">
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <h1>Captura tus momentos, preserva tus recuerdos</h1>
        <p>Descubre nuestros álbumes fotográficos físicos y revive cada instante en tus manos</p>
        <button type="button" className="m-3 p3
                btn w-25 mx-auto align-bottom btn-primary button-add"
                onClick={toggleShowAddModal}
        >Regístrate gratis</button>
        <div className="container">
        <Modal
          basicModal={addModal}
          setBasicModal={setAddModal}
          toggleShow={toggleShowAddModal}
          title="Regístrate en Album Maker"
          content={<AddUserForm addUser={addUser}/>}

        />
        </div>

        <div>
          <img src={DemoImage} alt="Animated GIF" />
        </div>
        <p className='mt-3'>Plantillas para recordar tus eventos especiales.<br />
          Personaliza una plantilla con tus fotos favoritas
        </p>
        <button type="button" className="m-3 p3
                btn w-25 mx-auto align-bottom btn-primary button-add"
                onClick={toggleShowLoginModal}
        >Ingresar</button>
        <div className="container">
        <Modal
          basicModal={loginModal}
          setBasicModal={setLoginModal}
          toggleShow={toggleShowLoginModal}
          title="Ingresar a Album Maker"
          content={<LoginForm loginUser={loginUser}/>}

        />
        </div>
      </main>
  );
}
