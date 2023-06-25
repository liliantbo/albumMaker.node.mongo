import React from 'react';
import { ReactComponent as LoginIcon } from './user1.svg'
import { ReactComponent as ToogleThemeIcon } from './theme-light-dark.svg'
import DemoImage from './AlbumMakerDemo.gif'
import './App.css';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { useFlow } from './Controllers/FlowAndSelectedOptionContext';
import { newAlbum, changeTheme } from './Controllers/Actions';

import AlbumFooter from './AlbumFooter';

export default function Landing() {
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
                <LoginIcon aria-hidden="true" />
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
      <body className={`App ${theme}`}>
        <main className="d-flex flex-column ">
          <h1>Captura tus momentos, preserva tus recuerdos</h1>
          <p>Descubre nuestros álbumes fotográficos físicos y revive cada instante en tus manos</p>
          <button type="button" className="m-3 p3 
                btn w-25 mx-auto align-bottom btn-primary"
          >Regístrate gratis</button>
          <div>
            <img src={DemoImage} alt="Animated GIF" />
          </div>
          <p className='mt-3'>Plantillas para recordar tus eventos especiales.<br />
            Personaliza una plantilla con tus fotos favoritas
          </p>
          <button type="button" className="m-3 p3 
                btn w-25 mx-auto align-bottom btn-primary"
          >Ingresar</button>
        </main>

      </body>

      <AlbumFooter />
    </div >
  );
}
