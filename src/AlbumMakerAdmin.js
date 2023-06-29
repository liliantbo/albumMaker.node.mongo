import React from 'react';
import { ReactComponent as CreateNewAlbumIcon } from './document-new.svg'
import { ReactComponent as ToogleThemeIcon } from './Users/theme-light-dark.svg'
import './App.css';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { useSelector } from 'react-redux';

export default function AlbumMakerAdmin() {
  //redux store
  const theme = useSelector(state => state.alb.theme);

  //redux reducer

  const newAlbumHandler = () => {
  };
  const changeThemeHandler = () => {
  };

  const newAlbumTooltip = (
    <Tooltip id="newAlbumTooltip">Nuevo Album</Tooltip>
  );

  const changeThemeTooltip = (
    <Tooltip id="changeThemeTooltip">Cambiar tema</Tooltip>
  );

  return (
    <div className={`App ${theme}`}>
      <header className="d-flex flex-row bg-primary bd-highlight" style={{ height: '10vh' }}>
        <div className="me-auto p-2 bd-highlight">
          <p className="logo text-light">Album Maker</p>
        </div>
        <ul className="nav flex-row d-flex p-2 bd-highlight 
        justify-content-end align-items-stretch">
          <li className="nav-item me-3">
            <OverlayTrigger placement="bottom" overlay={newAlbumTooltip}>
              <button className="btn btn-primary btn-focus shadow-none"
                onClick={newAlbumHandler}>
                <CreateNewAlbumIcon aria-hidden="true" />
              </button>
            </OverlayTrigger>
          </li>
          <li className="nav-item me-3">
            <OverlayTrigger placement="bottom" overlay={changeThemeTooltip}>
              <button className="btn btn-primary btn-focus shadow-none"
                onClick={changeThemeHandler}>
                <ToogleThemeIcon aria-hidden="true" />
              </button>
            </OverlayTrigger>
          </li>
        </ul>
      </header >
      <div className="d-flex flex-row " style={{ height: '83vh' }}>
        Album maker ADMIN
      </div>
    </div >
  );
}
