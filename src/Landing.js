import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Users/Login';

import { ReactComponent as LoginIcon } from './Users/user1.svg';
import { ReactComponent as ToogleThemeIcon } from './Users/theme-light-dark.svg';
import './App.css';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useFlow } from './reducers/FlowAndSelectedOptionContext';
import { newAlbum, changeTheme } from './reducers/Actions';

import AlbumFooter from './AlbumFooter';
import AlbumMakerClient from './AlbumMakerClient';

export default function Landing() {
  const loggedIn = useSelector(state => state.auth.loggedIn);
  console.log("selector state.auth.loggedIn ", loggedIn);

  const { state, dispatch } = useFlow();
  const { theme } = state;

  const newAlbumHandler = () => {
    dispatch(newAlbum());
  };
  const changeThemeHandler = () => {
    dispatch(changeTheme());
  };

  const newAlbumTooltip = (
    <Tooltip id="newAlbumTooltip">Ingresar</Tooltip>
  );

  const changeThemeTooltip = (
    <Tooltip id="changeThemeTooltip">Cambiar tema</Tooltip>
  );

  const renderContent = () => {
    switch (loggedIn) {
        case false:
            return <Login />;
        case true:
            return <AlbumMakerClient />;
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
              <OverlayTrigger placement="bottom" overlay={newAlbumTooltip}>
                <button className="btn btn-primary btn-focus shadow-none" onClick={newAlbumHandler}>
                  <LoginIcon aria-hidden="true" />
                </button>
              </OverlayTrigger>
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
        {renderContent()}
    </div>
  );
}
