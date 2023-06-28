import React from 'react';
import { ReactComponent as CreateNewAlbumIcon } from './document-new.svg'
import { ReactComponent as ToogleThemeIcon } from './Users/theme-light-dark.svg'
import './App.css';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { useFlow } from './reducers/FlowAndSelectedOptionContext';
import { newAlbum, changeTheme } from './reducers/Actions';

import AlbumFooter from './AlbumFooter';
import AlbumBody from './AlbumBody/BodyOptions';
import BodyMain from './AlbumBody/BodyMain';

export default function AlbumMaker() {
  const { state, dispatch } = useFlow();
  const { theme } = state;

  const newAlbumHandler = () => {
    dispatch(newAlbum());
  };
  const changeThemeHandler = () => {
    dispatch(changeTheme());
  };

  const newAlbumTooltip = (
    <Tooltip id="newAlbumTooltip">Nuevo Album</Tooltip>
  );

  const changeThemeTooltip = (
    <Tooltip id="changeThemeTooltip">Cambiar tema</Tooltip>
  );

  return (
    <div className={`App ${theme}`}>
      <div className="d-flex flex-row " style={{ height: '83vh' }}>
        <AlbumBody>
          <BodyMain />
        </AlbumBody>
      </div>
      <AlbumFooter />
    </div >
  );
}
