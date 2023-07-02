import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Alert, OverlayTrigger, Tooltip  } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { listAlbums, updateAlbumList } from './reducers/albumActions';
import { listStatistics } from './reducers/adminActions';
import { PAGE_ALBUM, PAGE_STATISTICS, ROL_ADMIN } from './commonComponents/Properties';

import AlbumList from './commonComponents/AlbumList';
import mongoToRedux from './commonComponents/mongoToRedux';
import { ReactComponent as SaveIcon } from './save.svg';

const loginTooltip = (
  <Tooltip id="saveTooltip">Guardar</Tooltip>
);

export default function AlbumMakerAdmin() {

  //redux store
  const rol = useSelector(state => state.auth.user.rol);
  const albums = useSelector(state => state.alb.albumList);
  const actualPage = useSelector(state => state.adm.actualPage);

  const isAdminUser=rol===ROL_ADMIN;
  const isAlbumPage=actualPage===PAGE_ALBUM;

  //redux reducer
  const dispatch = useDispatch();
  const statisticsHandler = () => {
    dispatch(listStatistics());
  };
  const allAlbumHandler = () => {
    dispatch(listAlbums());
  };
  const saveHandler = () => {
    setSave(true);
  };

  const setAlbums=(albumList)=>{
    dispatch(updateAlbumList(albumList));
  }
  const editAlbum = (album) => {
    return null;
  };
  const deleteAlbum = (id) => {
    setAlbums(albums.filter((album) => album.id !== id));
  };

   //alert
   const [save, setSave] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/admin")
      .then((response) => {
        console.log("ALbumMakerAdmin :: useEffect :: response: ", response);
        const data = response.data.map((album) =>mongoToRedux(album));
        console.log("ALbumMakerAdmin :: useEffect :: data: ", data);
        setAlbums(data);
      })
      .catch((error) => {
        console.error("ALbumMakerAdmin :: useEffect :: error: ", error);
      });
  }, []);

  const renderContent = () => {
    switch (actualPage) {
        case PAGE_ALBUM:
            return <AlbumList albums={albums} editAlbum={editAlbum} deleteAlbum={deleteAlbum}/>;
        case PAGE_STATISTICS:
            return isAdminUser ? null : <AlbumList editAlbum={editAlbum} deleteAlbum={deleteAlbum}/>;
        default:
            return null;
    }
};
  return (
    <div>
      <header className="d-flex flex-row bg-black bd-highlight">
        <ul className="nav flex-row d-flex p-0 bd-highlight 
        justify-content-start align-items-stretch">
          <li className="nav-item d-flex align-items-stretch me-3">
            <button className={`btn btn-dark btn-focus shadow-none ${isAlbumPage ? 'bg-secondary' : ''}`}
              onClick={allAlbumHandler}>
              Ordenes
            </button>
          </li>
          <li className="nav-item me-3">
            <button className={`btn btn-dark btn-focus shadow-none ${!isAlbumPage ? 'bg-secondary' : ''}`}
              onClick={statisticsHandler}>
              Estadisticas
            </button>
          </li>
          <li className="nav-item me-3">
            <OverlayTrigger placement="bottom" overlay={loginTooltip}>
              <button className="btn btn-primary btn-focus shadow-none" onClick={saveHandler}>
                <SaveIcon aria-hidden="true" />
              </button>
            </OverlayTrigger>
          </li>
        </ul>
      </header >
      {save && <Alert variant="success">Cambios Almacenados Exitosamente</Alert>}
        <div className="d-flex flex-row " style={{ height: '83vh' }}>
        {renderContent()}          
        </div>
        
    </div >
  );
}
