import React, { useEffect } from 'react';
import axios from "axios";

import { useSelector, useDispatch } from 'react-redux';
import { listAlbums, updateAlbumList } from './reducers/albumActions';
import { listStatistics } from './reducers/adminActions';
import { PAGE_ALBUM, PAGE_STATISTICS, ROL_ADMIN } from './commonComponents/Properties';

import AlbumList from './AlbumList';
import mongoToRedux from './commonComponents/mongoToRedux';

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

  const setAlbums=(albumList)=>{
    dispatch(updateAlbumList(albumList));
  }
  const editAlbum = (album) => {
    return null;
  };
  const deleteAlbum = (id) => {
    setAlbums(albums.filter((album) => album.id !== id));
  };

  useEffect(() => {
    axios.get("http://localhost:3000/admins")
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
            return isAdminUser ? null : <AlbumList editAlbum={editAlbum} deleteAlbum={deleteAlbum}/>;;
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
        </ul>
      </header >
      
        <div className="d-flex flex-row " style={{ height: '83vh' }}>
        {renderContent()}          
        </div>
     
    </div >
  );
}
