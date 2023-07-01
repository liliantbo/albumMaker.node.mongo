import React, { useState, useEffect } from 'react';
import axios from "axios";

import { useSelector, useDispatch } from 'react-redux';
import { newAlbum, listAlbums, updateAlbumList } from './reducers/albumActions';
import { FLOW_LIST } from './commonComponents/Properties';

import AlbumMakerCreator from './AlbumMakerCreator';
import DirectoryTable from './commonComponents/DirectoryTable';
import mongoToRedux from './commonComponents/mongoToRedux';

export default function AlbumMakerClient() {

  //redux store
  const email = useSelector(state => state.auth.user.email);
  const flow = useSelector(state => state.alb.flow);
  const albums = useSelector(state => state.alb.albumList);
  const isListFlow = flow === FLOW_LIST;

  //redux reducer
  const dispatch = useDispatch();
  const newAlbumHandler = () => {
    dispatch(newAlbum(email));
  };
  const allAlbumHandler = () => {
    dispatch(listAlbums());
  };

  const setAlbums=(albumList)=>{
    dispatch(updateAlbumList(albumList));
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [albumsPerPage] = useState(10);
  const editAlbum = (album) => {
    return null;
  };
  const deleteAlbum = (id) => {
    setAlbums(albums.filter((album) => album.id !== id));
  };

  useEffect(() => {
    axios.get("http://localhost:3000/clients")
      .then((response) => {
        console.log("ALbumMakerClient :: useEffect :: response: ", response);
        const data = response.data.map((album) =>mongoToRedux(album));
        console.log("ALbumMakerClient :: useEffect :: data: ", data);
        setAlbums(data);
      })
      .catch((error) => {
        console.error("ALbumMakerClient :: useEffect :: error: ", error);
      });
  }, []);
  

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = Array.isArray(albums) ? albums.slice(indexOfFirstAlbum, indexOfLastAlbum) : [];

  return (
    <div>
      <header className="d-flex flex-row bg-black bd-highlight">
        <ul className="nav flex-row d-flex p-0 bd-highlight 
        justify-content-start align-items-stretch">
          <li className="nav-item d-flex align-items-stretch me-3">
            <button className={`btn btn-dark btn-focus shadow-none ${isListFlow ? 'bg-secondary' : ''}`}
              onClick={allAlbumHandler}>
              Mis Albumes
            </button>
          </li>
          <li className="nav-item me-3">
            <button className={`btn btn-dark btn-focus shadow-none ${!isListFlow ? 'bg-secondary' : ''}`}
              onClick={newAlbumHandler}>
              Nuevo Album
            </button>
          </li>
        </ul>
      </header >
      {!isListFlow ? <AlbumMakerCreator /> : (
        <div className="d-flex flex-row " style={{ height: '83vh' }}>
          <DirectoryTable
            albums={currentAlbums}
            editAlbum={editAlbum}
            deleteAlbum={deleteAlbum}
          />
          
        </div>
      )}
    </div >
  );
}
