import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { updateAlbumList } from '../reducers/albumActions';
import { showAlbums, showStatistics } from '../reducers/adminActions';
import { PAGE_ALBUM, PAGE_STATISTICS, ROL_ADMIN } from '../commonComponents/Properties';

import AlbumList from '../commonComponents/AlbumList';
import Statistics from './Statistics';
import mongoToRedux from '../commonComponents/mongoToRedux';
import { ReactComponent as SaveIcon } from './save.svg';
import { ReactComponent as ReloadIcon } from './reload.svg';

const loginTooltip = (
  <Tooltip id="saveTooltip">Guardar</Tooltip>
);
const reloadTooltip = (
  <Tooltip id="reloadTooltip">Recargar</Tooltip>
);

export default function AlbumMakerAdmin() {

  //variable de control del userEffect
  const [reload, setReload] = useState(true);

  //redux store
  const rol = useSelector(state => state.auth.user.rol);
  const albums = useSelector(state => state.alb.albumList);
  const actualPage = useSelector(state => state.adm.actualPage);

  const isAdminUser = rol === ROL_ADMIN;
  const isAlbumPage = actualPage === PAGE_ALBUM;

  //redux reducer
  const dispatch = useDispatch();
  const statisticsHandler = () => {
    dispatch(showStatistics());
  };
  const allAlbumHandler = () => {
    dispatch(showAlbums());
  };

  const reloadHandler = () => {
    setReload(prevValue => !prevValue);
  }

  const saveHandler = () => {
    return axios
      .patch("http://localhost:3000/admin/album", { albums })
      .then((response) => {
        console.log("OrderResume :: handleOnClick :: Album almacenado exitosamente");
        let responseMongo = response.data.data;
        console.log("OrderResume :: handleOnClick :: responseMongo: ", responseMongo);
        
        const albumsToDelete = albums.filter((album) => album.estado === "DELETED");
        const deletePromises = albumsToDelete.map((album) =>
          axios.delete(`http://localhost:3000/admin/album/${album._id}`)
        );
  
        Promise.all(deletePromises)
          .then(() => {
            console.log("OrderResume :: handleOnClick :: Álbumes eliminados exitosamente");
            // Actualizar la lista de álbumes en el estado
            const newAlbumList = albums.filter((album) => album.estado !== "DELETED");
            console.log("OrderResume :: handleOnClick :: newAlbumList (sin deleted): ", newAlbumList);
            dispatch(updateAlbumList(newAlbumList));
            setSave(true);
          })
          .catch((error) => {
            console.error("Error al eliminar álbumes:", error);
          });
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };
  

  const setAlbums = (albumList) => {
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
        const data = response.data.map((album) => mongoToRedux(album));
        console.log("ALbumMakerAdmin :: useEffect :: data: ", data);
        setAlbums(data);
      })
      .catch((error) => {
        console.error("ALbumMakerAdmin :: useEffect :: error: ", error);
      });
  }, [reload]);

  const renderContent = () => {
    switch (actualPage) {
      case PAGE_ALBUM:
        return <AlbumList albums={albums} editAlbum={editAlbum} deleteAlbum={deleteAlbum} />;
      case PAGE_STATISTICS:
        return isAdminUser ? <Statistics /> : null;
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
          {isAdminUser && (
            <li className="nav-item me-3">
              <button className={`btn btn-dark btn-focus shadow-none ${!isAlbumPage ? 'bg-secondary' : ''}`}
                onClick={statisticsHandler}>
                Estadisticas
              </button>
            </li>
          )}
          <li className="nav-item me-3">
            <OverlayTrigger placement="bottom" overlay={reloadTooltip}>
              <button className="btn btn-primary btn-focus shadow-none"
                onClick={reloadHandler}>
                <ReloadIcon aria-hidden="true" />
              </button>
            </OverlayTrigger>
          </li>
          {isAlbumPage && (
            <li className="nav-item me-3">
              <OverlayTrigger placement="bottom" overlay={loginTooltip}>
                <button className="btn btn-primary btn-focus shadow-none" onClick={saveHandler}>
                  <SaveIcon aria-hidden="true" />
                </button>
              </OverlayTrigger>
            </li>)}
        </ul>
      </header >
      {save && <Alert variant="success">Cambios Almacenados Exitosamente</Alert>}
      <div className="d-flex flex-row " style={{ height: '83vh' }}>
        {renderContent()}
      </div>

    </div >
  );
}
