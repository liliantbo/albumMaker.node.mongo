import React, {useState} from 'react';
import axios from "axios";
import { Alert, OverlayTrigger, Tooltip  } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { login, logout, changeTheme } from './reducers/authActions';
import { ROL_USER } from './commonComponents/Properties';

import Login from './Users/Login';
import LoginForm from './Users/LoginForm'
import AlbumMakerClient from './AlbumMakerClient';
import AlbumMakerAdmin from './AlbumMakerAdmin';
import Modal from './commonComponents/Modal'

import { ReactComponent as LoginIcon } from './Users/user1.svg';
import { ReactComponent as ToogleThemeIcon } from './Users/theme-light-dark.svg';
import {ReactComponent as LogoutIcon } from './Users/sign-out.svg'

export default function Landing() {

  //redux store
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const user =  useSelector(state => state.auth.user);
  const theme =  useSelector(state => state.auth.theme);
  const { rol } = user
  const isUser = rol === ROL_USER;

  console.log("selector state.auth.loggedIn ", loggedIn);
  console.log("selector state.auth.user ", rol);

  //redux reducer
  const dispatch = useDispatch();
  const changeThemeHandler = () => {
    dispatch(changeTheme());
  };

  //alert
  const [error, setError] = useState(null);

  //modal
  const [loginModal, setLoginModal] = useState(false);
  const toggleShowLoginModal = () => setLoginModal(!loginModal);
  const loginUser = (user) => {
    toggleShowLoginModal();
    axios
      .post("http://localhost:3000/users/login", { user })
      .then((response) => {
        dispatch(login(response.data));
        console.log('Data:', response.data)
        setError(null);
      }).catch((error) => {
        console.error('Error:', error);
        setError("Usuario o password incorrectos");
      });
  };
  const logoutUser = (user) => {
    axios
      .post("http://localhost:3000/users/logout", { user })
      .then((response) => {
        dispatch(logout());
        console.log('Data:', response.data)
        setError(null);
      });
  };

  //Botones Header
  const loginTooltip = (
    <Tooltip id="loginTooltip">Ingresar</Tooltip>
  );
  const logoutTooltip = (
    <Tooltip id="logoutTooltip">Salir</Tooltip>
  );

  const changeThemeTooltip = (
    <Tooltip id="changeThemeTooltip">Cambiar tema</Tooltip>
  );

  //render en base a si hizo login y que rol tiene el usuario
  const renderContent = () => {
    switch (loggedIn) {
      case false:
        return <Login />;
      case true:
        return isUser ? <AlbumMakerClient /> : <AlbumMakerAdmin />;
      default:
        return null;
    }
  };
  
  return (
    <div className={`App ${theme}`}>

      <header className="d-flex flex-row bg-primary bd-highlight" style={{ height: '10vh' }}>
        <div className="me-auto p-2 bd-highlight">
          <p className="logo text-light">Album Maker</p>
        </div>
        <ul className="nav flex-row d-flex p-2 bd-highlight justify-content-end align-items-stretch">
          <li className="nav-item me-3">
            <OverlayTrigger placement="bottom" overlay={loggedIn?logoutTooltip:loginTooltip}>
              <button className="btn btn-primary btn-focus shadow-nonebutton-add"
                onClick={loggedIn?(()=>logoutUser(user)):toggleShowLoginModal}
              >
                {loggedIn?<LogoutIcon aria-hidden="true" />:<LoginIcon aria-hidden="true" />}
              </button>
            </OverlayTrigger>
            <div className="container">
              <Modal
                basicModal={loginModal}
                setBasicModal={setLoginModal}
                toggleShow={toggleShowLoginModal}
                title="Ingresar a Album Maker"
                content={<LoginForm loginUser={loginUser} />}

              />
            </div>
          </li>
          <li className="nav-item me-3">
            <OverlayTrigger placement="bottom" overlay={changeThemeTooltip}>
              <button className="btn btn-primary btn-focus shadow-none" onClick={changeThemeHandler}>
                <ToogleThemeIcon aria-hidden="true" />
              </button>
            </OverlayTrigger>
          </li>
        </ul>
      </header>
      {error && <Alert variant="danger">{error}</Alert>}
      {renderContent()}
    </div>
  );
}
