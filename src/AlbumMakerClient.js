import React, {useState, useEffect} from 'react';
import './App.css';

import { useFlow } from './reducers/FlowAndSelectedOptionContext';
import { newAlbum, changeTheme, listAlbums } from './reducers/Actions';
import Pagination from './commonComponents/Pagination';
import DirectoryTable from './commonComponents/DirectoryTable';
import axios from "axios";
import { FLOW_LIST } from './commonComponents/Properties';
import AlbumMaker from './AlbumMaker';

export default function AlbumMakerClient() {
  const { state, dispatch } = useFlow();
  const { theme, flow } = state;
  const isAllAlbumSelected=true;
  const isListFlow = flow === FLOW_LIST; 

  const newAlbumHandler = () => {
    dispatch(newAlbum());
  };
  const allAlbumHandler = () => {
    dispatch(listAlbums());
  };
  const [albums, setAlbums] = useState([]);
  const initialFormState = {
    albumId: null,
    userEmail: "",
    fecha: null,
    identificationNumber:"",
    name: "",
    telephone: "",
    city: "",
    address: "",
    identificationNumberS: "",
    nameS: "",
    telephoneS: "",
    cityS: "",
    addressS:"",
    imageList: [],
    template: "",
    estado: "",
    operador: "",
    courier: "",
    motivoCancelacion: ""
  };
  const [currentAlbum, setCurrentAlbum] = useState(initialFormState);
  const [currentPage, setCurrentPage] = useState(1);
  const [albumsPerPage] = useState(10);

  const editAlbum = (album) => {
  
  };

  const updateAlbum = (id, updatedAlbum) => {

  };

  const deleteAlbum = (id) => {
    setAlbums(albums.filter((album) => album.id !== id));
  };

  useEffect(() => {
    axios("http://localhost:3000/admin/albums/data")
      .then((response) =>
        response.data.map((album) => ({
          id: album._id,
          title: album.title,
          artist: album.artist,
          genre: album.genre,
          year: album.year,
          image: album.image,
        }))
      )
      .then((data) => {
        setAlbums(data);
      });
  }, []);

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={`App ${theme}`}>
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
      {!isListFlow?<AlbumMaker/>:(
      <div className="d-flex flex-row " style={{ height: '83vh' }}>
      <DirectoryTable
        albums={currentAlbums}
        editAlbum={editAlbum}
        deleteAlbum={deleteAlbum}
      />
      <Pagination
        albumsPerPage={albumsPerPage}
        totalAlbums={albums.length}
        paginate={paginate}
      />
      </div>
      )}
    </div >
  );
}
